"use client"

import { useEffect, useState, useRef } from "react"
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  Platform,
} from "react-native"
import axios from "axios"
import RNHTMLtoPDF from "react-native-html-to-pdf"
import RNFS from "react-native-fs"
import { useDispatch, useSelector } from "react-redux"
import { LoaderAction } from "../../redux/Actions"
import { AppStyles, MetricsMod } from "../../themes"
import VectorIconComponent from "../../Component"
import { ICON_TYPES } from "../../constants/constant"
import { requestPermissions } from "../../Component/requestPermissions"
import { MAIN_SCREENS } from "../../constants/screens"

// Conceptual import for react-native-image-resizer
// You will need to install this package in your actual React Native project:
// npm install @bam.tech/react-native-image-resizer
// or yarn add @bam.tech/react-native-image-resizer
// Then link it if necessary: npx react-native link @bam.tech/react-native-image-resizer
// For the sandbox environment, this import is commented out.
// import ImageResizer from '@bam.tech/react-native-image-resizer';

const ROOM_FIELDS = {
  "Front & Side Aspects": ["walls", "windows", "lawn_drive_way", "doors",],
  entranceHall: ["walls", "windows", "ceiling", "floor", "doors"],
  livingRoom: ["walls", "ceiling", "windows", "floor", "doors", "sockets_switches"],
  kitchen: ["walls", "units", "appliances", "doors", "floor", "ceiling", "sockets_switches"],
  rearGarden: ["fence", "lawn", "plants", "structures"],
  landing: ["walls", "windows", "ceiling", "floor", "doors"],
  bedroom: ["walls", "ceiling", "windows", "floor", "doors", "sockets_switches"],
  bathroom: ["walls", "ceiling", "windows", "floor", "doors", "fixtures", "bathShowerSet", "sockets_switches"],
}

const { width } = Dimensions.get("window")

const normalizeRoomName = (name) => {
  if (!name) return "unknown"
  const lowerName = name.toLowerCase().replace(/\s+/g, "")
  if (lowerName.includes("front") || lowerName.includes("side")) return "Front & Side Aspects"
  if (lowerName.includes("entrance") || lowerName.includes("hall")) return "entranceHall"
  if (lowerName.includes("living")) return "livingRoom"
  if (lowerName.includes("kitchen")) return "kitchen"
  if (lowerName.includes("rear") || lowerName.includes("garden")) return "rearGarden"
  if (lowerName.includes("landing")) return "landing"
  if (lowerName.includes("bedroom")) return "bedroom"
  if (lowerName.includes("bathroom")) return "bathroom"
  return lowerName
}

const formatDate = (dateString) => {
  if (!dateString || dateString === "0000-00-00") return "N/A"
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return "N/A"
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const generateFileName = (inspectionDate) => {
  const now = inspectionDate ? new Date(inspectionDate) : new Date()
  const pad = (n) => (n < 10 ? `0${n}` : n)
  const formattedDate = `${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}_${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`
  return `Routine_Inspection_${formattedDate}`
}


// Helper to build image URLs
const buildImageUrl = (url) => {
  if (!url) return null
  const cleanUrl = url.replace(/^uploads\/+/, "").replace(/^\/+/, "")
  return `https://api.inventorywise.co.uk/uploads/${cleanUrl}`
}

// Placeholder image URI (Base64 for robustness in PDF embedding)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjODg4Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+"

function PropertyDetailPage(props) {
  const { property } = props.route.params || {}
  const { navigation } = props
  const [propertyData, setPropertyData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageModalVisible, setImageModalVisible] = useState(false)
  const [error, setError] = useState(null)
  const isMounted = useRef(true)
  const user = useSelector((state) => state.AuthReducer.user)
  const token = user?.jwtToken
  const dispatch = useDispatch()

  useEffect(() => {
    isMounted.current = true
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`https://api.inventorywise.co.uk/properties/${property?.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (isMounted.current) {
          console.log("Property Data:3545545454549900990", JSON.stringify(response.data, null, 2))
          setPropertyData(response.data)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted.current) {
          setError("Failed to fetch property details")
          setLoading(false)
        }
      }
    }
    if (property?.id) {
      fetchPropertyDetails()
    }
    return () => {
      isMounted.current = false
    }
  }, [property?.id, token])

  const convertImageToBase64 = async (url) => {
    if (!url) {
      console.warn("No URL provided for image conversion")
      return null
    }
    try {
      const cleanUrl = url.replace(/^uploads\/+/, "").replace(/^\/+/, "")
      const fullUrl = `https://api.inventorywise.co.uk/uploads/${cleanUrl}`
      console.log("Fetching:", fullUrl)

      const response = await fetch(fullUrl, {
        headers: { Authorization: `${token}` },
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const blob = await response.blob()

      let base64Data = null

      // --- START: Image Resizing Logic (Requires react-native-image-resizer) ---
      // This part is conceptual for the sandbox. In your actual React Native app,
      // you would use the imported ImageResizer.
      try {
        // Create a temporary file path for the image blob
        const tempFilePath = `${RNFS.CachesDirectoryPath}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`
        // Convert blob to base64 string to write to file
        const reader = new FileReader()
        const blobBase64 = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]) // Get base64 part
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
        await RNFS.writeFile(tempFilePath, blobBase64, "base64")

        // In a real app, this would be:
        // const resizedImage = await ImageResizer.createResizedImage(
        //   tempFilePath,
        //   800, // Max width
        //   600, // Max height (will maintain aspect ratio if only one dimension is provided)
        //   "JPEG", // Format (PNG, JPEG, WEBP)
        //   80, // Quality (0-100)
        //   0, // Rotation
        //   RNFS.CachesDirectoryPath // Output path
        // );
        // base64Data = await RNFS.readFile(resizedImage.uri, 'base64');
        // base64Data = `data:image/jpeg;base64,${base64Data}`; // Add data URI prefix

        // For the sandbox, we'll just convert the original blob to base64
        // and add a console log to indicate where resizing would happen.
        console.log("Image resizing would occur here using react-native-image-resizer.")
        base64Data = `data:image/jpeg;base64,${blobBase64}` // Use the base64 from the blob directly for sandbox

        // Clean up temporary file (in a real app)
        // await RNFS.unlink(tempFilePath);
        // if (resizedImage && resizedImage.uri) {
        //   await RNFS.unlink(resizedImage.uri);
        // }
      } catch (resizeError) {
        console.warn(`Image resizing failed for ${fullUrl}:`, resizeError)
        console.warn("Falling back to original image size. This might cause memory issues.")
        // Fallback to original base64 if resizing fails
        const reader = new FileReader()
        base64Data = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      }
      // --- END: Image Resizing Logic ---

      return base64Data
    } catch (error) {
      console.error(`Image conversion error for ${url}: ${error.message}`)
      return null
    }
  }

  const generatePDF = async () => {
    try {
      dispatch(LoaderAction.LoaderTrue())
      const hasPermission = await requestPermissions()

      if (!hasPermission) {
        Alert.alert("Permission Denied", "Cannot continue without storage access.")
        dispatch(LoaderAction.LoaderFalse())
        return
      }

      if (!propertyData) {
        Alert.alert("Error", "No property data available to generate PDF")
        dispatch(LoaderAction.LoaderFalse())
        return
      }

      // Convert signatures
      const tenantSignature = propertyData.signature_tenant
        ? propertyData.signature_tenant.startsWith("data:image/")
          ? propertyData.signature_tenant
          : `data:image/png;base64,${propertyData.signature_tenant.trim()}`
        : null

      const inspectorSignature = propertyData.signature_inspector
        ? propertyData.signature_inspector.startsWith("data:image/")
          ? propertyData.signature_inspector
          : `data:image/png;base64,${propertyData.signature_inspector.trim()}`
        : null

      // Convert all images to base64 (now with resizing applied in convertImageToBase64)
      const [
        logoImg,
        mainImg,
        electricityMeterImg,
        gasMeterImg,
        waterMeterImg,
        heatingSystemImg,
        smokeAlarmFrontImg,
        smokeAlarmBackImg,
        coAlarmFrontImg,
        coAlarmBackImg,
      ] = await Promise.all([
        convertImageToBase64(user?.company_logo),
        convertImageToBase64(propertyData.main_img),
        convertImageToBase64(propertyData.electricity_meter_img),
        convertImageToBase64(propertyData.gas_meter_img),
        convertImageToBase64(propertyData.water_meter_img),
        convertImageToBase64(propertyData.heating_system_img),
        convertImageToBase64(propertyData.smoke_alarm_front_img),
        convertImageToBase64(propertyData.smoke_alarm_back_img),
        convertImageToBase64(propertyData.co_alarm_front_img),
        convertImageToBase64(propertyData.co_alarm_back_img),
      ])

      const propertyImages = {}
      const failedImages = []
      for (const area of propertyData?.property_details || []) {
        for (const img of area.property_images || []) {
          const base64 = await convertImageToBase64(img.url)
          if (base64) {
            propertyImages[img.url] = base64
          } else {
            failedImages.push(img.url)
          }
        }
      }

      if (failedImages.length > 0) {
        Alert.alert("Warning", `Some images could not be loaded: ${failedImages.join(", ")}`, [{ text: "OK" }])
      }

      // Generate property areas HTML based on your provided Flutter structure
      const propertyAreasHTML =
        propertyData?.property_details
          ?.map((area) => {
            const getFieldValue = (field) =>
              area[field] !== null && area[field] !== undefined && area[field] !== ""
                ? area[field]
                : null;

            let surfaceField, surfaceLabel;
            if (area.name === "Front & Side Aspect" || area.name === "Front & Side Aspects") {
              surfaceField = "lawn_drive_way";
              surfaceLabel = "Lawn/Driveway: ";
            } else if (area.name === "Rear Garden") {
              surfaceField = "lawn";
              surfaceLabel = "Lawn: ";
            } else {
              surfaceField = "floor";
              surfaceLabel = "Floor: ";
            }

            const surfaceValue = getFieldValue(surfaceField);
            const wallsValue = area.name === "Rear Garden"
              ? getFieldValue("wall_fence")
              : getFieldValue("walls");
            const plantsValue = area.name === "Rear Garden" ? getFieldValue("plants") : null;
            const structuresValue = area.name === "Rear Garden" ? getFieldValue("structures") : null;
            const ceilingValue = getFieldValue("ceiling");
            const windowsValue = getFieldValue("windows");
            const sockets_switches = getFieldValue("sockets_switches");
            const doorsValue = getFieldValue("doors");
            const appliancesValue = getFieldValue("appliances");
            const unitsValue = getFieldValue("units");
            const bathShowerValue = getFieldValue("bath_shower_set");
            const RoofGuttering = getFieldValue("roof_guttering");
            const hedges = getFieldValue("hedges");



            return `
            <div class="area-section">
              <div class="area-title">${area.name || "Unnamed Area"}</div>
              <div class="area-table-container">
                <table class="area-table">
                  <tr>
                    <th>Description</th>
                    <th>Details</th>
                  </tr>
                  ${surfaceValue ? `
                  <tr>
                    <td>${surfaceLabel}</td>
                    <td>${surfaceValue}</td>
                  </tr>` : ''}
                  ${wallsValue ? `
                  <tr>
                    <td>${area.name === "Rear Garden" ? "Wall/Fence: " : "Walls: "}</td>
                    <td>${wallsValue}</td>
                  </tr>` : ''}
                  ${plantsValue ? `
                  <tr>
                    <td>Plants:</td>
                    <td>${plantsValue}</td>
                  </tr>` : ''}
                  ${structuresValue ? `
                  <tr>
                    <td>Structures:</td>
                    <td>${structuresValue}</td>
                  </tr>` : ''}
                  ${ceilingValue ? `
                  <tr>
                    <td>Ceiling</td>
                    <td>${ceilingValue}</td>
                  </tr>` : ''}
                  ${windowsValue ? `
                  <tr>
                    <td>Windows</td>
                    <td>${windowsValue}</td>
                  </tr>` : ''}
                  ${sockets_switches ? `
                    <tr>
                      <td>Sockets/Switchs</td>
                      <td>${sockets_switches}</td>
                    </tr>` : ''}
                     ${RoofGuttering ? `
                    <tr>
                      <td>Roof & Guttering</td>
                      <td>${RoofGuttering}</td>
                    </tr>` : ''}

                      ${hedges ? `
                    <tr>
                      <td>Hedges</td>
                      <td>${hedges}</td>
                    </tr>` : ''}
                  ${doorsValue ? `
                  <tr>
                    <td>Doors</td>
                    <td>${doorsValue}</td>
                  </tr>` : ''}
                  ${area.name === "Kitchen" && appliancesValue ? `
                  <tr>
                    <td>Appliances</td>
                    <td>${appliancesValue}</td>
                  </tr>` : ''}
                  ${area.name === "Kitchen" && unitsValue ? `
                  <tr>
                    <td>Units</td>
                    <td>${unitsValue}</td>
                  </tr>` : ''}
                  ${area.name.includes("Bathroom") && bathShowerValue ? `
                  <tr>
                    <td>Bath/Shower Set</td>
                    <td>${bathShowerValue}</td>
                  </tr>` : ''}
                  <tr>
                    <td>Details</td>
                    <td>${area.description || ""}</td>
                  </tr>
                </table>
              </div>
              <div class="area-images-container">
                ${area.property_images?.length
                ? area.property_images
                  .map((img) =>
                    propertyImages[img.url]
                      ? `<img class="area-image" src="${propertyImages[img.url]}" alt="${area.name} Image" />`
                      : `<img class="area-image" src="${PLACEHOLDER_IMAGE}" alt="Placeholder" />`
                  ).join("")
                : '<div style="grid-column: 1/-1; text-align: center; color: var(--text-light); font-size: 25px; padding: 20px;">No images available</div>'
              }
              </div>
            </div>
          `;
          })
          .join("") || '<div class="area-section"><div class="area-title">No property areas available</div></div>';

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8" />
          <title>Property Inspection Report</title>
          <style>
            :root {
              --primary-blue: #03a5fc;
              --dark-blue: #007bb5;
              --light-blue: #e0f2f7;
              --text-dark: #2c3e50;
              --text-medium: #555;
              --text-light: #777;
              --border-light: #e0e0e0;
              --background-light: #f8f9fa;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
             margin: 20px 15px 15px 15px; /* Reduced all margins */
              color: var(--text-dark);
              line-height: 1.5;
              padding-top: 20px;
             font-size: 12px; /* Slightly reduced base font size */
              background: #ffffff;
            }
            /* Header */
            .header {
              background: linear-gradient(135deg, var(--primary-blue) 0%, var(--dark-blue) 100%);
              border-radius: 8px;
              padding: 15px 20px; /* Reduced padding */
            margin-bottom: 10px; /* Reduced margin */
              color: white;
              display: flex;
              justify-content: space-between;
              align-items: center;
              page-break-after: avoid;
            }
            .logo {
              height: 250px; /* Increased size */
              width: 600px; /* Increased size */
              object-fit: contain;
              border-radius: 6px;
              padding: 2px;
            }
            .company-info {
              text-align: left;
              font-size: 22px;
              line-height: 1.3;
            }
            .company-row {
              display: flex;
              gap: 10px;
              margin-bottom: 5px;
              align-items: center;
            }
            .company-label {
              font-weight: 600;
              min-width: 110px;
              color: var(--light-blue);
            }
            .company-value {
              font-weight: 400;
              color: white;
            }
            /* Title Section */
            .title-section {
              text-align: center;
              margin: 15px auto 20px auto; /* Reduced margin */
              max-width: 850px;
              page-break-inside: avoid;
            }
            .inspection-title {
              background: var(--primary-blue);
              color: white;
             padding: 12px 30px; /* Reduced padding */
              border-radius: 12px;
              font-size: 28px;
              font-weight: bold;
              display: inline-block;
             margin-bottom: 12px; /* Reduced margin */
              border: 1px solid black;
            }
            .property-address {
              font-size: 22px;
              font-weight: bold;
              color: black;
             margin-bottom: 15px; /* Reduced margin */
              text-align: center;
            }
            /* Main Image */
            .main-image {
              display: block;
              margin: 0 auto 0 auto; /* Removed margin-bottom */
              width: 30%; /* Decreased width */
              height: 220px; /* Adjusted height proportionally */
              object-fit: cover;
              border-radius: 10px;
               margin-bottom: 0; /* Removed bottom margin */
              border: 4px solid gray;
              page-break-inside: avoid;
            }
            /* Info Grid */
            .info-grid {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 0; /* Removed margin-top */
              margin-bottom: 20px; /* Reduced margin */
              page-break-inside: avoid;
              margin: 0 0 15px 0; /* Reduced margins */

            }
            .info-card {
              background: white;
              border-radius: 8px;
             padding: 12px; /* Reduced padding */
              border: 1px solid var(--border-light);
              width: 85%;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 8px;
            }
            .info-table td {
             padding: 15px !important; /* Reduced padding */
              border-bottom: 1px solid black;
            }
            .info-table .label {
              font-weight: bold;
              color: black;
              width: 50%;
            }
            .info-table .value {
              color: black;
              font-weight: 300;
              width: 80%;
            }
            /* Summary */
            .summary-section {
              margin: 25px 40px; /* Reduced margin */
              background: var(--background-light);
              border-radius: 12px;
              padding: 25px;
              border: 1px solid black;
              min-height: 80px;
              page-break-inside: avoid;
            }
            .summary-title {
              font-size: 15px;
              font-weight: bold;
              color: var(--primary-blue);
              text-align: center;
              margin-bottom: 12px; /* Reduced margin */
            }
            .summary-text {
              font-size: 8px;
              color: black;
              line-height: 1.4;
            }
            /* Important Information */
            .important-info {
              margin: 30px 50px; /* Reduced margin */
              background: var(--background-light);
              border-radius: 8px;
              padding: 30px;
              border-left: 3px solid var(--primary-blue);
              /* page-break-before: always; Removed to reduce blank pages */
            }
            .important-info .section-title {
              font-size: 15px;
              font-weight: bold;
              color: var(--primary-blue);
              text-align: center;
              margin-bottom: 15px; /* Reduced margin */
              padding-bottom: 14px;
              border-bottom: 1px solid var(--primary-blue);
            }
            .info-item {
              margin-bottom: 20px;
              page-break-inside: avoid;
            }
            .info-subtitle {
              font-size: 15px;
              font-weight: bold;
              color: black;
              margin-bottom: 14px;
              padding: 8px 0;
            }
            .info-text {
              font-size: 12px;
              color: black;
              line-height: 1.4;
              text-align: justify;
              margin-left: 18px;
            }
            /* Meters and Alarms Section */
        .meters-section {
  margin: 50px 30px 20px 30px; /* top right bottom left */
}
          .meters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
  gap: 25px;
  justify-items: center;
  align-items: start;
}
          .meter-card {
  width: 100%;
  max-width: 220px;
  height: 340px;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
            .meter-header {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin: 5px 0 5px 0;
            }
            .meter-label {
              font-size: 12px;
              font-weight: bold;
              color: var(--primary-blue);
              text-align: center;
            }
            .meter-value {
              font-size: 10px;
              font-weight: bold;
              color: black;
              text-align: center;
            }
          .meter-card hr {
  border: 1px solid var(--primary-blue);
  margin: 6px 0;
}
            .meter-image {
  border-radius: 10px;
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  margin: auto;
}
          
.meter-images-dual {
  display: flex;
  justify-content: space-between;
  width: 120%;
  gap: 10px;
}
         .meter-images-dual img {
  width: 68%;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
}
            /* Property Areas Section */
            .property-areas {
              margin: 30px 50px; /* Reduced margin */
              /* page-break-before: always; Removed to reduce blank pages */
            }
         .area-section {
  margin-top: 0px;        /* 👈 Adds space above each area */
  margin-bottom: 20px;     /* Already present – keeps spacing below */
  page-break-inside: avoid;
}
            .area-title {
              font-size: 16px;
              margin-top: 60px;  
              font-weight: bold;
              color: var(--primary-blue);
              margin-left: 0px;
              margin-bottom: 12px; /* Reduced margin */
            }
            .area-table-container {
              margin: 0 auto;
              max-width: 100%; /* Slightly increased width */
            }
            .area-table {
             table-layout: fixed;
              width: 100%;
              border-collapse: collapse;
              font-family: Arial, Helvetica, sans-serif;
              border: 1px solid #ddd;
              background-color: #FFFFFF !important;
            }
              .area-table th:first-child,
.area-table td:first-child {
  width: 15%;
  padding-right: 5px !important;
  text-align: left;
  font-weight: bold;
}
  .area-table th:nth-child(2),
.area-table td:nth-child(2) {
  width: 85%;
  padding-left: 15px !important;
}
            .area-table th,
            .area-table td {
              border: 1px solid #ddd;
              padding: 10px !important; /* Reduced padding */
              color: black;
              background-color: #FFFFFF !important;
            }
            .area-table th {
              padding-top: 20px;
              padding-bottom: 20px;
              text-align: left;
              background-color: var(--primary-blue) !important;
              color: white;
              font-size: 10px;
            }
            .area-table td {
              font-size: 10px;
              font-weight: 500;
            }
            .area-table tr:nth-child(even) {
              background-color: var(--light-blue) !important;
            }
            .area-images-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
            gap: 12px; /* Reduced gap */
              margin-top: 8px; /* Reduced margin */
              page-break-inside: avoid;
            }
            .area-image {
              width: 100%;
              max-width: 280px;
              height: 200px; /* Kept consistent */
              object-fit: contain;
              border-style: solid;
              border-color: grey;
              display: block;
              margin: 0 auto;
              background: #f8f8f8;
            }
            /* Advice Section */
            .advice-section {
              margin: 30px 50px; /* Reduced margin */
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 25px;
              /* page-break-before: always; Removed to reduce blank pages */
            }
            .advice-card {
              background: var(--background-light);
              border-radius: 8px;
              padding: 25px;
              border-left: 3px solid var(--primary-blue);
              page-break-inside: avoid;
            }
            .advice-title {
              font-size: 15px;
              font-weight: bold;
              color: var(--primary-blue);
              text-align: center;
              margin-bottom: 12px; /* Reduced margin */
            }
            .advice-text {
              font-size: 12px;
              color: black;
              line-height: 1.4;
            }
            .advice-card hr {
              border: 2px solid black;
              margin: 20px 0;
            }
            /* Declaration */
            .declaration {
              margin: 30px 50px; /* Reduced margin */
              background: var(--background-light);
              border-radius: 8px;
              padding: 25px;
              border: 1px solid var(--text-medium);
              page-break-inside: avoid;
            }
            .declaration-title {
              font-size: 12px;
              font-weight: bold;
              color: black;
              text-align: center;
              margin-bottom: 12px; /* Reduced margin */
            }
            .declaration-text {
              font-size: 8px;
              color: black;
              line-height: 1.4;
              text-align: justify;
            }
            /* Signatures */
         .signatures {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 30px 50px;
  page-break-inside: avoid;
  position: relative; /* Added for divider positioning */
}
            .signature-box {
              flex: 1;
              min-width: 280px;
              height: auto;
              border: none;
              border-radius: 12px;
              padding: 18px;
              text-align: center;
              margin: 0 8px;
            }
              .signature-divider {
  width: 1px;
  background-color: #ccc;
  height: 100%; /* Match the height of signature boxes */
  align-self: stretch;
}
            .signature-title {
              font-size: 12px;
              font-weight: bold;
              color: black;
              margin-top: 8px;
              margin-bottom: 20px; /* Reduced margin */
            }
            .signature-image {
              width: 100%;
              height: auto;
              max-height: 280px;
              object-fit: contain;
              border-radius: 10px;
              display: block;
              margin: auto;
            }
            /* Page Break Control */
            .no-break {
              page-break-inside: avoid;
            }
            @media print {
              body {
                -webkit-print-color-adjust: exact;
                margin: 20px; /* Further adjusted for print */
                font-size: 12px;
                padding-top: 20px;
              }
       .area-section {
    margin-top: 0; /* Remove margin-top for print */
    margin-bottom: 15px;
    padding-top: 20px; /* Consistent top padding for each area section */
    page-break-inside: avoid;
  }
              .header {
                padding: 15px 25px;
                margin-bottom: 10px; /* Further adjusted for print */
              }
              .logo {
                height: 170px; /* Adjusted for print */
                width: 380px; /* Adjusted for print */
              }
              .company-info {
                font-size: 16px;
              }
              .company-row {
                gap: 6px;
                margin-bottom: 3px;
              }
              .company-label {
                min-width: 70px;
              }
              .inspection-title {
                font-size: 10px;
                padding: 10px 25px;
                margin-bottom: 10px; /* Further adjusted for print */
              }
              .property-address {
                font-size: 12px;
                margin-bottom: 15px; /* Further adjusted for print */
              }
              .main-image {
                width: 25%; /* Adjusted for print */
                height: 180px; /* Adjusted for print */
                margin-bottom: 0;
              }
              .info-card {
                padding: 12px;
                width: 95%;
              }
              .info-table {
                font-size: 10px;
              }
              .info-table td {
                padding: 20px;
              }
              .summary-section {
                margin: 20px 30px; /* Further adjusted for print */
                padding: 18px;
                min-height: 60px;
              }
              .summary-title {
                font-size: 15px;
                margin-bottom: 10px; /* Further adjusted for print */
              }
              .summary-text {
                font-size: 12px;
              }
              .section-title {
                font-size: 15px;
               margin-bottom: 10px; /* Reduced margin */
                padding-bottom: 6px;
              }
              .important-info {
                margin: 25px 40px; /* Further adjusted for print */
                padding: 20px;
              }
              .info-item {
                margin-bottom: 15px;
              }
              .info-subtitle {
                font-size: 15px;
                margin-bottom: 10px;
                padding: 6px 0;
              }
              .info-text {
                font-size: 12px;
                margin-left: 12px;
              }
           
              .meter-card {
                height: 350px; /* Reduced height */
              padding: 10px; /* Reduced padding */
                margin-top: 10px;
                width: 220px;
              }
              .meters-grid {
                gap: 20px;
              }
              .meter-header {
                margin: 8px 0 4px 0;
              }
              .meter-label, .meter-value {
                font-size: 12px;
              }
              .meter-card hr {
                border: 1px solid var(--primary-blue);
                margin: 4px 0;
              }
              .meter-image {
                width: 60%;
                height: 150px;
              }
              .meter-images-dual {
                width: 60%;
              }
              .meter-images-dual img {
                width: 60%;
               height: 250px; /* Reduced height */
              }
              .property-areas {
                margin: 25px 40px; /* Further adjusted for print */
              }
         
              .area-title {
                font-size: 16px;
                margin-left: 50px;
                margin: 0 0 8px 30px; /* Reduced margin */
                // margin-bottom: 10px; /* Further adjusted for print */
              }
              .area-table-container {
                max-width: 100%; /* Adjusted for print */
              }
              .area-table th, .area-table td {
                padding: 10px;
                font-size: 10px;
              }
              .area-table th {
                padding-top: 15px;
                padding-bottom: 15px;
              }
              .area-image {
                height: 250px;
              }
              .advice-section {
                margin: 25px 40px; /* Further adjusted for print */
                gap: 18px;
              }
              .advice-card {
                padding: 18px;
              }
              .advice-title {
                font-size: 15px;
                margin-bottom: 10px; /* Further adjusted for print */
              }
              .advice-text {
                font-size: 12px;
              }
              .advice-card hr {
                margin: 15px 0;
              }
              .declaration {
                margin: 25px 40px; /* Further adjusted for print */
                padding: 18px;
              }
              .declaration-title {
                font-size: 12px;
                margin-bottom: 10px; /* Further adjusted for print */
              }
              .declaration-text {
                font-size: 10px;
              }
              .signatures {
                gap: 40px;
                margin: 25px 40px; /* Further adjusted for print */
              }
              .signature-box {
                padding: 12px;
                width: 300px;
                height: 300px;
              }
              .signature-title {
                font-size: 12px;
                margin-bottom: 20px; /* Further adjusted for print */
              }
              .signature-image {
                width: 200px;
                height: 200px;
              }
            }
            @media (max-width: 998px) {
              .info-grid, .advice-section, .signatures {
                grid-template-columns: 1fr;
              }
              .meters-grid {
               }
              .area-content {
                grid-template-columns: 1fr;
              }
              body {
                margin: 15px;
                font-size: 18px;
              }
              .header {
                padding: 10px 15px;
                margin-bottom: 8px;
              }
              .logo {
               height: 120px;
                width: 300px;
              }
              .company-info {
                font-size: 18px;
              }
              .company-row {
                gap: 6px;
                margin-bottom: 3px;
              }
              .company-label {
                min-width: 90px;
              }
              .inspection-title {
                font-size: 12px;
              padding: 8px 20px;
                margin-bottom: 12px;
              }
              .property-address {
                font-size: 20px;
                margin-bottom: 25px;
              }
              .main-image {
                width: 50%;
                height: 300px;
                margin-bottom: 5px;
              }
              .info-card {
                padding: 12px;
                width: 100%;
              }
              .info-table {
                font-size: 10px;
              }
              .info-table td {
                padding: 10px !important;
              }
              .summary-section {
                margin: 25px 20px;
                padding: 18px;
                min-height: 60px;
              }
              .summary-title {
                font-size: 15px;
                margin-bottom: 12px;
              }
              .summary-text {
                font-size: 10px;
              }
              .section-title {
                font-size: 15px;
                margin-bottom: 12px;
                padding-bottom: 6px;
              }
              .important-info {
                margin: 35px 20px;
                padding: 20px;
              }
              .info-item {
                margin-bottom: 15px;
              }
              .info-subtitle {
                font-size: 15px;
                margin-bottom: 10px;
                padding: 6px 0;
              }
              .info-text {
                font-size: 12px;
                margin-left: 12px;
              }
              .meters-grid {
                gap: 25px;
              }
              .meter-card {
                padding: 12px;
                height: 300px;
                max-width: 140%;
                margin-top: 15px;
              }
              .meter-header {
                margin: 8px 20px 6px 10px;
              }
              .meter-label, .meter-value {
                font-size: 12px;
              }
              .meter-card hr {
                margin: 0 20px;
              }
              .meter-image {
                width: 70%;
                height: 200px;
              }
              .meter-images-dual {
                width: 70%;
              }
              .meter-images-dual img {
                width: 70%;
                height: 200px;
              }
              .property-areas {
                margin: 35px 20px;
              }
            
              .area-title {
                font-size: 12px;
                margin-left: 0px;
                margin-bottom: 12px;
              }
              .area-table th, .area-table td {
                padding: 10px;
                font-size: 10px;
              }
              .area-table th {
                padding-top: 15px;
                padding-bottom: 15px;
              }
              .area-image {
                height: 280px;
              }
                
              .advice-section {
                margin: 35px 20px;
                gap: 18px;
              }
              .advice-card {
                padding: 18px;
              }
              .advice-title {
                font-size: 15px;
                margin-bottom: 12px;
              }
              .advice-text {
                font-size: 12px;
              }
              .advice-card hr {
                margin: 15px 0;
              }
              .declaration {
                margin: 35px 20px;
                padding: 18px;
              }
              .declaration-title {
                font-size: 12px;
                margin-bottom: 12px;
              }
              .declaration-text {
                font-size: 10px;
              }
              .signatures {
                gap: 30px;
                margin: 35px 20px;
              }
              .signature-box {
                padding: 12px;
                width: 100%;
                height: 380px;
              }
              .signature-title {
                font-size: 14px;
                margin-bottom: 25px;
              }
              .signature-image {
                width: 100%;
                height: 280px;
              }
            }
          </style>
        </head>
        <body>
          <header>
            <div class="header no-break">
              <img class="logo" src="${logoImg || PLACEHOLDER_IMAGE}" alt="Company Logo" />
              <div class="company-info">
                <div class="company-row">
                  <span class="company-label">Company:</span>
                  <span class="company-value">${user?.company_name || "Company Name"}</span>
                </div>
                <div class="company-row">
                  <span class="company-label">Address:</span>
                  <span class="company-value">${user?.company_address || "Company Address"}</span>
                </div>
                <div class="company-row">
                  <span class="company-label">Phone:</span>
                  <span class="company-value">${user?.company_phone || "Phone Number"}</span>
                </div>
                <div class="company-row">
                  <span class="company-label">Email:</span>
                  <span class="company-value">${user?.company_email || "Email Address"}</span>
                </div>
              </div>
            </div>
          </header>
          <div class="title-section no-break">
            <div class="inspection-title" style="font-size: 20px;">${propertyData?.types || "Property Inspection Report"}</div>
            <div class="property-address">${propertyData?.property_address || "Property Address"}</div>
          </div>
          <div style="display: flex; justify-content: center; align-items: center">
            <img class="main-image" src="${mainImg || PLACEHOLDER_IMAGE}" alt="Property Main Image" />
          </div>
          <div class="info-grid no-break">
            <div class="info-card">
              <table class="info-table">
                <tr>
                  <td class="label" style="font-size: 15px;" >Inspected By</td>
                  <td class="value" style="font-size: 12px;">${propertyData?.inspector_name || "Inspector Name"}</td>
                </tr>
                <tr>
                  <td class="label" style="font-size: 15px;" >Tenants Name</td>
                  <td class="value" style="font-size: 12px;" >${propertyData?.tenant_name || "Tenant Name"}</td>
                </tr>
                <tr>
                  <td class="label" style="font-size: 15px;" >Date of Inspection</td>
                  <td class="value" style="font-size: 12px;">${formatDate(propertyData?.inspection_date)}</td>
                </tr>
                <tr>
                  <td class="label" style="font-size: 15px;">EPC Expiry Date</td>
                  <td class="value" style="font-size: 12px;" >${formatDate(propertyData?.epc_expiry_date)}</td>
                </tr>
                <tr>
                  <td class="label" style="font-size: 15px;">Gas Safety Cert Expiry Date</td>
                  <td class="value" style="font-size: 12px;">${formatDate(propertyData?.gas_safety_certificate_exp_date)}</td>
                </tr>
                <tr>
                  <td class="label" style="font-size: 15px;">EICR Expiry Date</td>
                  <td class="value" style="font-size: 12px;">${formatDate(propertyData?.eicr_expiry_date)}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="summary-section no-break">
            <div class="summary-title" style="font-size: 20px;">Summary</div>
            <div class="summary-text">${propertyData?.final_remarks || "Property inspection summary and key findings."}</div>
          </div>

          <div class="meters-section">
  <div class="meters-grid">

    ${propertyData?.gas_meter
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Pre-Paid Gas Meter: <span style="color: black;">${propertyData.gas_meter}</span></span>
            <span class="meter-value">Reading: <span style="color: black;">${propertyData.gas_meter_reading || "N/A"}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${gasMeterImg || PLACEHOLDER_IMAGE}" alt="Gas Meter" />
        </div>`
          : ""
        }

    ${propertyData?.electricity_meter
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Pre-Paid Elec-Meter: <span style="color: black;">${propertyData.electricity_meter}</span></span>
            <span class="meter-value">Reading: <span style="color: black;">${propertyData.electricity_meter_reading || "N/A"}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${electricityMeterImg || PLACEHOLDER_IMAGE}" alt="Electricity Meter" />
        </div>`
          : ""
        }

    ${propertyData?.water_meter
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Water Meter: <span style="color: black;">${propertyData.water_meter}</span></span>
            <span class="meter-value">Reading: <span style="color: black;">${propertyData.water_meter_reading || "N/A"}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${waterMeterImg || PLACEHOLDER_IMAGE}" alt="Water Meter" />
        </div>`
          : ""
        }

    ${propertyData?.heating_system
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Heating System: <span style="color: black;">${propertyData.heating_system}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${heatingSystemImg || PLACEHOLDER_IMAGE}" alt="Heating System" />
        </div>`
          : ""
        }

    ${propertyData?.smoke_alarm
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Smoke Alarms: <span style="color: black;">${propertyData.smoke_alarm}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${smokeAlarmFrontImg || PLACEHOLDER_IMAGE}" alt="Smoke Alarm Front" />
        </div>`
          : ""
        }

         ${propertyData?.smoke_alarm
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">Smoke Alarms: <span style="color: black;">${propertyData.smoke_alarm}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${smokeAlarmBackImg || PLACEHOLDER_IMAGE}" alt="Smoke Alarm Front" />
        </div>`
          : ""
        }

    ${propertyData?.co_alarm
          ? `<div class="meter-card no-break">
          <div class="meter-header">
            <span class="meter-label">CO Alarms: <span style="color: black;">${propertyData.co_alarm}</span></span>
          </div>
          <hr />
          <img class="meter-image" src="${coAlarmFrontImg || PLACEHOLDER_IMAGE}" alt="CO Alarm Front" />
        </div>`
          : ""
        }

  </div>
</div>
          <div class="property-areas">
            ${propertyAreasHTML}
          </div>
<div class="advice-title" style="color: white; text-align: center;">
  fafdasdfasdfadsfasdfasdf
</div>
  <div class="advice-title" style="color: white; text-align: center;">
  fafdasdfasdfadsfasdfasdf
</div>
         <div class="advice-section" style="padding-top: 20px;">
            <div class="advice-card no-break">
              <div class="advice-title">Advice for Tenant:</div>
              <div class="advice-text">${propertyData?.advised_tenant_to || "No specific advice for tenant."}</div>
              <hr />
            </div>
            <div class="advice-card no-break">
              <div class="advice-title">Advice for Landlord:</div>
              <div class="advice-text">${propertyData?.asked_landlord_to || "No specific advice for landlord."}</div>
              <hr />
            </div>
          </div>
          <div class="important-info">
            <div class="section-title">Important Information</div>
            <div class="info-item no-break">
              <div class="info-subtitle">What is an Inventory Check-In Report?</div>
              <div class="info-text">
                The Inventory Check-In Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the outset of the lease of the Property.
              </div>
            </div>
            <div class="info-item no-break">
              <div class="info-subtitle">What are the benefits of using this Report?</div>
              <div class="info-text">
                The importance of a professional inventory and statement of condition cannot be underestimated. Government advice indicates that Inventories and statements of condition are 'strongly recommended' as a means to reduce dispute about the deposit at the end of a tenancy. It is in the Tenant's interests to carefully check this Inventory Check-In Report and to highlight any discrepancies as soon as possible and in any event no later than five working days after this Inventory Check-In Report is completed. Any outstanding discrepancies found at the end of the tenancy will be highlighted in an Inventory Outgoing Report and may affect the retention or release of a tenancy deposit.
              </div>
            </div>
            <div class="info-item no-break">
              <div class="info-subtitle">Is the report aimed at the landlord or the tenant?</div>
              <div class="info-text">
                The Inventory Check-In Report is objective and contains photographic evidence, it may be relied upon and used by the Landlord, the Tenant and Letting Agent.
              </div>
            </div>
            <div class="info-item no-break">
              <div class="info-subtitle">What does this Report tell you?</div>
              <div class="info-text">
                The Inventory Check-In Report provides a clear and easy to follow statement of condition for each of the main elements of the property on a room by room basis, together with its contents if appropriate. This report comments on and highlights defects or aspects of poor condition that have been identified by the Inventory Clerk. Defects in condition will either be described in the narrative of the report or evidenced in the photographs included in the report. Please Note: where no comment on the condition of an element or item of contents is made by the Inventory Clerk, the element or item is taken to be in good condition and without defect.
              </div>
            </div>
            <div class="info-item no-break">
              <div class="info-subtitle">What does the report not tell you?</div>
              <div class="info-text">
                Whilst every effort is made to ensure objectivity and accuracy, the Inventory Check-In Report provides no guarantee of the adequacy, compliance with standards or safety of any contents or equipment. The report will provide a record that such items exist in the property as at the date of the Inventory Check-In Report and the superficial condition of same. The report is not a building survey, a structural survey or a valuation, will not necessarily mention structural defects and does not give any advice on the cost of any repair work, or the types of repair which should be used.
              </div>
            </div>
<div class="advice-title" style="color: white; text-align: center;">
  fafdasdfasdfadsfasdfasdf
</div>
<div class="advice-title" style="color: white; text-align: center;">
  fafdasdfasdfadsfasdfasdf
</div>
            <div class="info-item no-break">
              <div class="info-subtitle">What is inspected and not inspected?</div>
              <div class="info-text">
                The Inventory Clerk carries out a visual inspection of the inside of the main building together with any contents and will carry out a general inspection of the remainder of the building including the exterior cosmetic elements and any permanent outbuildings. For properties let on an unfurnished basis, the inspection will include floor coverings, curtains, curtain tracks, blinds and kitchen appliances if appropriate, but will exclude other contents. Gardens and their contents will be inspected and reported upon. The inspection is non-invasive. The means that the Inventory Clerk does not take up carpets, floor coverings or floor boards, move large items of furniture, test services, remove secured panels or undo electrical fittings.
              </div>
            </div>
            <div class="info-item no-break">
              <div class="info-subtitle">What is a Mid-Term Inspection Report?</div>
              <div class="info-text">
                The Mid-Term Inspection Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition during the lease of the Property. Any defects and maintenance issues noted during the inspection are highlighted in the report. The tenants are required to rectify the issues which come under their obligations as per the terms & conditions of the tenancy agreement. Similarly, the landlord of the property will be asked to deal with the maintenance issues accordingly.
              </div>
            </div>
            <div class="info-item">
              <div class="info-subtitle">What is a Check-Out Report?</div>
              <div class="info-text">
                The Check-Out Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the end of the lease of the Property. Normally, the return of the tenancy deposit is based on the outcome of the Check- Out report.
              </div>
            </div>
          </div>
         <div class="signatures no-break" style="display: flex; align-items: center; gap: 20px;">
         <div class="signature-box">
    <div class="signature-title">Inspector's Signature</div>
    <div style="display: flex; justify-content: center; align-items: center; height: auto; min-height: 100px;">
      ${inspectorSignature ? `<img class="signature-image" src="${inspectorSignature}" alt="Inspector Signature" />` : '<div style="height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-light); font-size: 25px;">No signature available</div>'}
    </div>
  </div>
</div>

        </body>
        </html>
      `
      console.log("HTML Content Size:", htmlContent.length / (1024 * 1024), "MB") // Log size for debugging
      const options = {
        html: htmlContent,
        fileName: generateFileName(propertyData?.inspection_date),
        directory: "Documents",
        base64: true,
      }
      const file = await RNHTMLtoPDF.convert(options)
      if (!file.base64) {
        throw new Error("PDF base64 data not generated")
      }
      // const folderPath = `${RNFS.DownloadDirectoryPath}/InventoryWiseApp`
      const folderPath =
  Platform.OS === "android"
    ? `${RNFS.DownloadDirectoryPath}/InventoryWiseApp`
    : `${RNFS.DocumentDirectoryPath}/InventoryWiseApp`

      const fileExists = await RNFS.exists(folderPath)
      if (!fileExists) {
        await RNFS.mkdir(folderPath)
      }
      // Save file directly
      const finalPath = `${folderPath}/${options.fileName}.pdf`
      await RNFS.writeFile(finalPath, file.base64, "base64")
      Alert.alert("PDF Saved Successfully", `File saved to:\n${finalPath}`, [{ text: "OK" }])
      // Optionally open the PDF after saving
      // FileViewer.open(finalPath).catch(error => {
      //   console.error("Failed to open PDF:", error);
      //   Alert.alert("Error", "Could not open PDF file.");
      // });
    } catch (err) {
      console.error("PDF Error:", err)
      Alert.alert("Error", err.message || "Failed to generate PDF. Check console for details.")
    } finally {
      dispatch(LoaderAction.LoaderFalse())
    }
  }
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    )
  }
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    )
  }
  const renderBack = () => (
    <View style={styles.rowView}>
      <TouchableOpacity onPress={() => navigation.navigate(MAIN_SCREENS.HOME)}>
        <View style={styles.backButton}>
          <VectorIconComponent
            name="chevron-back-outline"
            size={25}
            color={AppStyles.colorSet.black}
            type={ICON_TYPES.IonIcons}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Property Detail</Text>
      <VectorIconComponent
        name="chevron-back-outline"
        size={25}
        color={AppStyles.colorSet.transparent}
        type={ICON_TYPES.IonIcons}
      />
    </View>
  )
  const renderPropertyImages = ({ item }) => {
    const imageUrl = buildImageUrl(item.url) || PLACEHOLDER_IMAGE
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => openImageModal(imageUrl)}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.propertyImage}
            resizeMode="cover"
            onError={(e) => console.log(`Failed to load image: ${imageUrl}`, e.nativeEvent)}
          />
        </TouchableOpacity>
        <Text style={styles.imageCaption}>Image {item.id}</Text>
      </View>
    )
  }
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl)
    setImageModalVisible(true)
  }
  const closeImageModal = () => {
    setImageModalVisible(false)
    setSelectedImage(null)
  }
  const renderPropertyDetail = ({ item }) => {
    console.log(item, "?A>SD?F>A?SDF>A?SFDAS/")
    const roomType = normalizeRoomName(item.name)
    const fields = ROOM_FIELDS[roomType] || []
    const fieldData = {
      Floor: item.floor || (fields.includes("floor") ? "Fair" : null),
      Walls: item.walls || (fields.includes("walls") ? "Fair" : null),
      Ceiling: item.ceiling || (fields.includes("ceiling") ? "Fair" : null),
      Windows: item.windows || (fields.includes("windows") ? "Fair" : null),
      Doors: item.doors || (fields.includes("doors") ? "Fair" : null),
      Appliances: item.appliances || (fields.includes("appliances") ? "Fair" : null),
      Units: item.units || (fields.includes("units") ? "Fair" : null),
      LawnDriveway: item.lawn_drive_way || (fields.includes("lawn_drive_way") ? "Fair" : null),
      Fence: item.wall_fence || (fields.includes("fence") ? "Fair" : null),
      Lawn: item.lawn || (fields.includes("lawn") ? "Fair" : null),
      Plants: item.plants || (fields.includes("plants") ? "Fair" : null),
      Structures: item.structures || (fields.includes("structures") ? "Fair" : null),
      Fixtures: item.fixtures || (fields.includes("fixtures") ? "Fair" : null),
      BathShowerSet: item.bath_shower_set || (fields.includes("bathShowerSet") ? "Fair" : null),
      socketsAndSwitches: item.sockets_switches || (fields.includes("sockets_switches") ? "Fair" : null),
      hedges: item.hedges || (fields.includes("hedges") ? "Fair" : null),
      roof_guttering: item.roof_guttering || (fields.includes("roof_guttering") ? "Fair" : null),

    }
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{item.name}</Text>
        {item.description && <Text style={styles.sectionText}>Description: {item.description}</Text>}
        <View style={styles.fieldTable}>
          {Object.entries(fieldData)
            .filter(([_, value]) => value)
            .map(([key, value]) => (
              <View key={key} style={styles.rowView}>
                <Text style={styles.fieldLabel}>{key}:</Text>
                <Text style={styles.fieldValue}>{value}</Text>
              </View>
            ))}
        </View>
        {item.property_images?.length > 0 && (
          <>
            <Text style={styles.subSectionTitle}>Images</Text>
            <FlatList
              data={item.property_images}
              renderItem={renderPropertyImages}
              keyExtractor={(image) => `image-${image.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.imageList}
            />
          </>
        )}
      </View>
    )
  }
  const formatSignatureUri = (signature) => {
    if (!signature) return null
    return signature.startsWith("data:image/") ? signature : `data:image/png;base64,${signature.trim()}`
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderBack()}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Section */}
        <View style={styles.heroImageContainer}>
          <TouchableOpacity onPress={() => openImageModal(buildImageUrl(propertyData?.main_img) || PLACEHOLDER_IMAGE)}>
            <Image
              source={{ uri: buildImageUrl(propertyData?.main_img) || PLACEHOLDER_IMAGE }}
              style={styles.heroImage}
              resizeMode="cover"
              onError={(e) => console.log(`Failed to load hero image: ${propertyData?.main_img}`, e.nativeEvent)}
            />
          </TouchableOpacity>
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.propertyAddress}>{propertyData?.property_address || "Property Address"}</Text>
              <View style={styles.inspectionBadge}>
                <Text style={styles.subSectionTitle}>{propertyData?.types || "Inspection"}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={generatePDF}>
            <View style={styles.actionButtonIcon}>
              <VectorIconComponent
                name="file-download"
                size={24}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.FontAwesome5}
              />
            </View>
            <Text style={styles.actionButtonText}>Download Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(MAIN_SCREENS.EDIT_PROPERTY, { id: property?.id })
            }}
          >
            <View style={styles.actionButtonIcon}>
              <VectorIconComponent
                name="edit"
                size={24}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.FontAwesome}
              />
            </View>
            <Text style={styles.actionButtonText}>Edit Report</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonIcon}>
              <VectorIconComponent
                name="share-2"
                size={24}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.Feather}
              />
            </View>
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity> */}
        </View>
        {/* General Information */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="info-circle"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.FontAwesome}
              />
            </View>
            <Text style={styles.sectionTitle}>General Information</Text>
          </View>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tenant</Text>
              <Text style={styles.infoValue}>{propertyData?.tenant_name || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Inspector</Text>
              <Text style={styles.infoValue}>{propertyData?.inspector_name || "N/A"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Inspection Date</Text>
              <Text style={styles.infoValue}>{formatDate(propertyData?.inspection_date)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Type</Text>
              <Text style={styles.infoValue}>{propertyData?.types || "N/A"}</Text>
            </View>
          </View>
        </View>
        {/* Certificates */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="certificate"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.FontAwesome}
              />
            </View>
            <Text style={styles.sectionTitle}>Certificates</Text>
          </View>
          <View style={styles.certificatesContainer}>
            <View style={styles.certificateItem}>
              <View style={[styles.certificateIcon, { backgroundColor: "#FFE0E0" }]}>
                <VectorIconComponent name="file-text" size={24} color="#FF6B6B" type={ICON_TYPES.Feather} />
              </View>
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>EPC Certificate</Text>
                <Text style={styles.certificateDate}>Expires: {formatDate(propertyData?.epc_expiry_date)}</Text>
              </View>
              <View style={[styles.certificateStatus, { backgroundColor: "#E0FFE0" }]}>
                <Text style={[styles.certificateStatusText, { color: "#28A745" }]}>Valid</Text>
              </View>
            </View>
            <View style={styles.certificateItem}>
              <View style={[styles.certificateIcon, { backgroundColor: "#E0F0FF" }]}>
                <VectorIconComponent name="file-text" size={24} color="#4A89DC" type={ICON_TYPES.Feather} />
              </View>
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>EICR Certificate</Text>
                <Text style={styles.certificateDate}>Expires: {formatDate(propertyData?.eicr_expiry_date)}</Text>
              </View>
              <View style={[styles.certificateStatus, { backgroundColor: "#E0FFE0" }]}>
                <Text style={[styles.certificateStatusText, { color: "#28A745" }]}>Valid</Text>
              </View>
            </View>
            <View style={styles.certificateItem}>
              <View style={[styles.certificateIcon, { backgroundColor: "#FFF0E0" }]}>
                <VectorIconComponent name="file-text" size={24} color="#FF9F43" type={ICON_TYPES.Feather} />
              </View>
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>Gas Safety Certificate</Text>
                <Text style={styles.certificateDate}>
                  Expires: {formatDate(propertyData?.gas_safety_certificate_exp_date)}
                </Text>
              </View>
              <View style={[styles.certificateStatus, { backgroundColor: "#E0FFE0" }]}>
                <Text style={[styles.certificateStatusText, { color: "#28A745" }]}>Valid</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Meter Readings */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="gauge"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.FontAwesome}
              />
            </View>
            <Text style={styles.sectionTitle}>Meter Readings</Text>
          </View>
          <View style={styles.metersContainer}>
            <View style={styles.meterCard}>
              <View style={styles.meterHeader}>
                <View style={[styles.meterIcon, { backgroundColor: "#FFF0E0" }]}>
                  <VectorIconComponent name="zap" size={20} color="#FF9F43" type={ICON_TYPES.Feather} />
                </View>
                <Text style={styles.meterTitle}>Electricity</Text>
              </View>
              <Text style={styles.meterReading}>{propertyData?.electricity_meter_reading || "N/A"}</Text>
              {propertyData?.electricity_meter_img && (
                <TouchableOpacity
                  onPress={() => openImageModal(buildImageUrl(propertyData.electricity_meter_img) || PLACEHOLDER_IMAGE)}
                  style={styles.meterImageContainer}
                >
                  <Image
                    source={{ uri: buildImageUrl(propertyData.electricity_meter_img) || PLACEHOLDER_IMAGE }}
                    style={styles.meterImage}
                    resizeMode="cover"
                    onError={(e) =>
                      console.log(
                        `Failed to load electricity meter image: ${propertyData?.electricity_meter_img}`,
                        e.nativeEvent,
                      )
                    }
                  />
                  <View style={styles.imageViewOverlay}>
                    <VectorIconComponent name="maximize-2" size={20} color="#FFF" type={ICON_TYPES.Feather} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.meterCard}>
              <View style={styles.meterHeader}>
                <View style={[styles.meterIcon, { backgroundColor: "#FFE0E0" }]}>
                  <VectorIconComponent name="fire" size={20} color="#FF6B6B" type={ICON_TYPES.Feather} />
                </View>
                <Text style={styles.meterTitle}>Gas</Text>
              </View>
              <Text style={styles.meterReading}>{propertyData?.gas_meter_reading || "N/A"}</Text>
              {propertyData?.gas_meter_img && (
                <TouchableOpacity
                  onPress={() => openImageModal(buildImageUrl(propertyData.gas_meter_img) || PLACEHOLDER_IMAGE)}
                  style={styles.meterImageContainer}
                >
                  <Image
                    source={{ uri: buildImageUrl(propertyData.gas_meter_img) || PLACEHOLDER_IMAGE }}
                    style={styles.meterImage}
                    resizeMode="cover"
                    onError={(e) =>
                      console.log(`Failed to load gas meter image: ${propertyData?.gas_meter_img}`, e.nativeEvent)
                    }
                  />
                  <View style={styles.imageViewOverlay}>
                    <VectorIconComponent name="maximize-2" size={20} color="#FFF" type={ICON_TYPES.Feather} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.meterCard}>
              <View style={styles.meterHeader}>
                <View style={[styles.meterIcon, { backgroundColor: "#E0F0FF" }]}>
                  <VectorIconComponent name="droplet" size={20} color="#4A89DC" type={ICON_TYPES.Feather} />
                </View>
                <Text style={styles.meterTitle}>Water</Text>
              </View>
              <Text style={styles.meterReading}>{propertyData?.water_meter_reading || "N/A"}</Text>
              {propertyData?.water_meter_img && (
                <TouchableOpacity
                  onPress={() => openImageModal(buildImageUrl(propertyData.water_meter_img) || PLACEHOLDER_IMAGE)}
                  style={styles.meterImageContainer}
                >
                  <Image
                    source={{ uri: buildImageUrl(propertyData.water_meter_img) || PLACEHOLDER_IMAGE }}
                    style={styles.meterImage}
                    resizeMode="cover"
                    onError={(e) =>
                      console.log(`Failed to load water meter image: ${propertyData?.water_meter_img}`, e.nativeEvent)
                    }
                  />
                  <View style={styles.imageViewOverlay}>
                    <VectorIconComponent name="maximize-2" size={20} color="#FFF" type={ICON_TYPES.Feather} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        {/* Property Areas */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="home"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.Feather}
              />
            </View>
            <Text style={styles.sectionTitle}>Property Areas</Text>
          </View>
          <FlatList
            data={propertyData?.property_details}
            renderItem={renderPropertyDetail}
            keyExtractor={(item) => `detail-${item.id}`}
            scrollEnabled={false}
            contentContainerStyle={styles.propertyAreasList}
          />
        </View>
        {/* Final Remarks */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="clipboard"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.Feather}
              />
            </View>
            <Text style={styles.sectionTitle}>Final Remarks</Text>
          </View>
          <View style={styles.remarksContainer}>
            <Text style={styles.remarksText}>{propertyData?.final_remarks || "N/A"}</Text>
          </View>
        </View>
        {/* Signatures */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionIconContainer}>
              <VectorIconComponent
                name="edit"
                size={20}
                color={AppStyles.colorSet.appPrimaryColor}
                type={ICON_TYPES.Feather}
              />
            </View>
            <Text style={styles.sectionTitle}>Signatures</Text>
          </View>
          <View style={styles.signaturesContainer}>
            {propertyData?.signature_inspector && (
              <View style={styles.signatureBox}>
                <Text style={styles.signatureLabel}>Inspector Signature</Text>
                <View style={styles.signatureImageContainer}>
                  <Image
                    source={{ uri: formatSignatureUri(propertyData.signature_inspector) || PLACEHOLDER_IMAGE }}
                    style={styles.signatureImage}
                    resizeMode="contain"
                    onError={(e) => console.log("Inspector signature error:", e.nativeEvent)}
                  />
                </View>
              </View>
            )}
            {propertyData?.signature_tenant && (
              <View style={styles.signatureBox}>
                <Text style={styles.signatureLabel}>Tenant Signature</Text>
                <View style={styles.signatureImageContainer}>
                  <Image
                    source={{ uri: formatSignatureUri(propertyData.signature_tenant) || PLACEHOLDER_IMAGE }}
                    style={styles.signatureImage}
                    resizeMode="contain"
                    onError={(e) => console.log("Tenant signature error:", e.nativeEvent)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Modal visible={imageModalVisible} transparent={true} animationType="fade" onRequestClose={closeImageModal}>
        <View style={styles.imageModal}>
          <View style={styles.modalBackground}>
            <TouchableOpacity style={styles.closeButton} onPress={closeImageModal}>
              <VectorIconComponent name="x" size={24} color="#FFF" type={ICON_TYPES.Feather} />
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={styles.fullScreenImage}
                resizeMode="contain"
                onError={(e) => console.log(`Failed to load modal image: ${selectedImage}`, e.nativeEvent)}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    height: MetricsMod.thirty,
    width: MetricsMod.thirty,
    borderRadius: MetricsMod.thirty / 2,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: AppStyles.colorSet.black,
  },
  heroImageContainer: {
    width: "100%",
    height: 280,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    padding: 16,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  propertyAddress: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    flex: 1,
    marginRight: 10,
  },
  inspectionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    borderRadius: 20,
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  actionButton: {
    alignItems: "center",
  },
  actionButtonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 5,
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    width: "50%",
    marginBottom: 20,
    paddingRight: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  certificatesContainer: {
    marginTop: 8,
  },
  certificateItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  certificateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  certificateInfo: {
    flex: 1,
  },
  certificateName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  certificateDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  certificateStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  certificateStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  metersContainer: {
    marginTop: 8,
  },
  meterCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  meterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  meterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  meterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  meterReading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  meterImageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    height: 200,
    position: "relative",
  },
  meterImage: {
    width: "100%",
    height: "100%",
  },
  imageViewOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  propertyAreasList: {
    marginTop: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  fieldTable: {
    marginVertical: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  imageList: {
    marginTop: 8,
  },
  imageContainer: {
    marginRight: 12,
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFF",
    padding: 8,
  },
  propertyImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  imageCaption: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
  },
  remarksContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  remarksText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#333",
  },
  signaturesContainer: {
    marginTop: 8,
  },
  signatureBox: {
    marginBottom: 20,
  },
  signatureLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  signatureImageContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EEE",
    minHeight: 100,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  signatureImage: {
    width: "100%",
    height: 80,
  },
  imageModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    width: width * 0.95,
    height: width * 0.95,
    maxHeight: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
    marginTop: 20,
  },
})
export default PropertyDetailPage
