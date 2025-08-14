import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { PERMISSIONS } from 'react-native-permissions';

const InspectionPDFGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data - replace with your actual data
  const inspectionData = {
    company: {
      name: "Promptmove Limited",
      address: "243B Dunstable Road, Luton, LU4 8BW",
      phone: "01582611040",
      email: "info@promptmove.co.uk"
    },
    property: {
      address: "1 Cardinal Court, Earls Meade Luton LU2 7JE",
      inspectedBy: "Sohayl Hussain",
      tenantName: "Sonila Lleshi",
      inspectionDate: "22-8-2023",
      inspectionType: "Mid Term Inspection"
    },
    meters: {
      prePaidGas: { exists: true, reading: "s1" },
      prePaidElectric: { exists: true, reading: "s1" },
      waterMeter: { exists: true, reading: "s1" },
      heatingSystem: { exists: true },
      smokeAlarm: { exists: true, details: "s1 s1" },
      coAlarm: { exists: false, details: "s1" }
    },
    rooms: [
      {
        name: "Entrance Hall",
        items: {
          floor: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Living Room 1",
        items: {
          floor: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Kitchen",
        items: {
          floor: "Fair",
          appliances: "Fair",
          units: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Rear Garden",
        items: {
          floor: "Fair",
          walls: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Bedroom 1",
        items: {
          floor: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Bedroom 2",
        items: {
          floor: "Fair",
          walls: "Damp on outside side way",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Bathroom 1",
        items: {
          floor: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      },
      {
        name: "Bathroom 2",
        items: {
          floor: "Fair",
          walls: "Fair",
          ceiling: "Fair",
          windows: "Fair",
          doors: "Fair"
        },
        details: ""
      }
    ],
    advice: {
      tenant: "To Keep the property clean, tidy and adequately ventilated at all times.",
      landlord: ""
    }
  };

  const generateHTMLContent = (data) => {
    const roomsHTML = data.rooms.map(room => {
      const itemsHTML = Object.entries(room.items)
        .map(([key, value]) => {
          const displayKey = key.charAt(0).toUpperCase() + key.slice(1);
          return `
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">${displayKey}</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${value}</td>
            </tr>
          `;
        }).join('');

      return `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h3 style="background-color: #f0f0f0; padding: 10px; margin: 0; border: 1px solid #ccc;">${room.name}</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
            <tr>
              <th style="padding: 8px; border: 1px solid #ccc; background-color: #f9f9f9; width: 30%;">Description</th>
              <th style="padding: 8px; border: 1px solid #ccc; background-color: #f9f9f9;">Details</th>
            </tr>
            ${itemsHTML}
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Details</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${room.details || ''}</td>
            </tr>
          </table>
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Inspection Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 12px;
            line-height: 1.4;
          }
          .header {
            text-align: left;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .company-info {
            margin-bottom: 15px;
          }
          .inspection-title {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
          }
          .property-info {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 14px;
            font-weight: bold;
            margin: 20px 0 10px 0;
            background-color: #e0e0e0;
            padding: 8px;
            border: 1px solid #ccc;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            vertical-align: top;
          }
          th {
            background-color: #f9f9f9;
            font-weight: bold;
          }
          .important-info {
            margin: 20px 0;
            padding: 15px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
          }
          .important-info h4 {
            margin-top: 0;
            color: #333;
          }
          .advice-section {
            margin-top: 30px;
          }
          .declaration {
            margin-top: 30px;
            font-size: 11px;
            line-height: 1.3;
          }
          .signature-section {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          }
          .signature-box {
            width: 45%;
            border-top: 1px solid #000;
            padding-top: 5px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-info">
            <strong>Company:</strong><br>
            ${data.company.name}<br>
            <strong>Address:</strong> ${data.company.address}<br>
            <strong>Phone:</strong> ${data.company.phone}<br>
            <strong>Email:</strong> ${data.company.email}
          </div>
          
          <div class="inspection-title">${data.property.inspectionType}</div>
          
          <div class="property-info">
            ${data.property.address}<br>
            <strong>Inspected By:</strong> ${data.property.inspectedBy}<br>
            <strong>Tenants Name:</strong> ${data.property.tenantName}<br>
            <strong>Date of Inspection:</strong> ${data.property.inspectionDate}
          </div>
        </div>

        <div class="section-title">Summary</div>

        <div class="important-info">
          <h4>Important Information</h4>
          
          <h4>What is an Inventory Check-In Report?</h4>
          <p>The Inventory Check-In Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the outset of the lease of the Property.</p>
          
          <h4>What are the benefits of using this Report?</h4>
          <p>The importance of a professional inventory and statement of condition cannot be underestimated. Government advice indicates that Inventories and statements of condition are 'strongly recommended' as a means to reduce dispute about the deposit at the end of a tenancy. It is in the Tenant's interests to carefully check this Inventory Check-In Report and to highlight any discrepancies as soon as possible and in any event no later than five working days after this Inventory Check-In Report is completed. Any outstanding discrepancies found at the end of the tenancy will be highlighted in an Inventory Outgoing Report and may affect the retention or release of a tenancy deposit.</p>
          
          <h4>Is the report aimed at the landlord or the tenant?</h4>
          <p>The Inventory Check-In Report is objective and contains photographic evidence, it may be relied upon and used by the Landlord, the Tenant and Letting Agent.</p>
          
          <h4>What does this Report tell you?</h4>
          <p>The Inventory Check-In Report provides a clear and easy to follow statement of condition for each of the main elements of the property on a room by room basis, together with its contents if appropriate. This report comments on and highlights defects or aspects of poor condition that have been identified by the Inventory Clerk. Defects in condition will either be described in the narrative of the report or evidenced in the photographs included in the report. Please Note: where no comment on the condition of an element or item of contents is made by the Inventory Clerk, the element or item is taken to be in good condition and without defect.</p>
          
          <h4>What does the report not tell you?</h4>
          <p>Whilst every effort is made to ensure objectivity and accuracy, the Inventory Check-In Report provides no guarantee of the adequacy, compliance with standards or safety of any contents or equipment. The report will provide a record that such items exist in the property as at the date of the Inventory Check-In Report and the superficial condition of same. The report is not a building survey, a structural survey or a valuation, will not necessarily mention structural defects and does not give any advice on the cost of any repair work, or the types of repair which should be used.</p>
          
          <h4>What is inspected and not inspected?</h4>
          <p>The Inventory Clerk carries out a visual inspection of the inside of the main building together with any contents and will carry out a general inspection of the remainder of the building including the exterior cosmetic elements and any permanent outbuildings. For properties let on an unfurnished basis, the inspection will include floor coverings, curtains, curtain tracks, blinds and kitchen appliances if appropriate, but will exclude other contents. Gardens and their contents will be inspected and reported upon. The inspection is non-invasive. The means that the Inventory Clerk does not take up carpets, floor coverings or floor boards, move large items of furniture, test services, remove secured panels or undo electrical fittings. Especially valuable contents such as antiques, personal items or items of jewellery are excluded from the report. Kitchenware will be inspected but individual items will not be condition rated. Common parts in relation to flats, exterior structural elements of the main building and the structure of any outbuildings will not be inspected. Roof spaces and cellars are not inspected. Areas which are locked or where full access is not possible, for example, attics or excessively full cupboards or outbuildings are not inspected.</p>
          
          <h4>What is a Mid-Term Inspection Report?</h4>
          <p>The Mid-Term Inspection Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition during the lease of the Property. Any defects and maintenance issues noted during the inspection are highlighted in the report. The tenants are required to rectify the issues which come under their obligations as per the terms & conditions of the tenancy agreement. Similarly, the landlord of the property will be asked to deal with the maintenance issues accordingly.</p>
          
          <h4>What is a Check-Out Report?</h4>
          <p>The Check-Out Report provides a fair, objective and impartial record of the general condition of the contents of the Property as well as its internal condition at the end of the lease of the Property. Normally, the return of the tenancy deposit is based on the outcome of the Check- Out report.</p>
        </div>

        <div class="section-title">Meters and Alarms</div>
        <table>
          <tr>
            <td style="width: 40%; font-weight: bold;">Pre-Paid Gas Meter:</td>
            <td>${data.meters.prePaidGas.exists ? 'Yes' : 'No'}</td>
            <td style="font-weight: bold;">Reading:</td>
            <td>${data.meters.prePaidGas.reading || ''}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Pre-Paid Electric Meter:</td>
            <td>${data.meters.prePaidElectric.exists ? 'Yes' : 'No'}</td>
            <td style="font-weight: bold;">Reading:</td>
            <td>${data.meters.prePaidElectric.reading || ''}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Water Meter:</td>
            <td>${data.meters.waterMeter.exists ? 'Yes' : 'No'}</td>
            <td style="font-weight: bold;">Reading:</td>
            <td>${data.meters.waterMeter.reading || ''}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Heating System:</td>
            <td>${data.meters.heatingSystem.exists ? 'Yes' : 'No'}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="font-weight: bold;">Smoke Alarm:</td>
            <td>${data.meters.smokeAlarm.exists ? 'Yes' : 'No'}</td>
            <td colspan="2">${data.meters.smokeAlarm.details || ''}</td>
          </tr>
          <tr>
            <td style="font-weight: bold;">CO Alarm:</td>
            <td>${data.meters.coAlarm.exists ? 'Yes' : 'No'}</td>
            <td colspan="2">${data.meters.coAlarm.details || ''}</td>
          </tr>
        </table>

        ${roomsHTML}

        <div class="advice-section">
          <div class="section-title">Advice for Tenant:</div>
          <p>${data.advice.tenant}</p>
          
          <div class="section-title">Advice for Landlord:</div>
          <p>${data.advice.landlord}</p>
        </div>

        <div class="declaration">
          <div class="section-title">Declaration</div>
          <p>This inventory provides a record of the contents of the property and the property's internal condition. The person preparing the inventory is not an expert in fabrics, wood, materials, antiques etc nor a qualified surveyor. The inventory should not be used as an accurate description of each piece of furniture and equipment. Any areas of dilapidation or defect at the commencement of the tenancy need to be reported to the landlord/agency within 7 days of the commencement of tenancy. All items and areas listed in the property are in good, clean, serviceable condition unless otherwise stated.</p>
        </div>

        <div class="signature-section">
          <div class="signature-box">
            <div>Tenant's Signature</div>
          </div>
          <div class="signature-box">
            <div>Inspector's Signature</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to storage to download the PDF file',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const generatePDF = async () => {
    try {
      setIsGenerating(true);

      // Request storage permission
      const hasPermission = true;
      if (!hasPermission) {
        Alert.alert('Error', 'Storage permission is required to save the PDF');
        return;
      }

      // Generate HTML content
      const htmlContent = generateHTMLContent(inspectionData);

      // PDF options
      const options = {
        html: htmlContent,
        fileName: `Inspection_Report_${new Date().getTime()}`,
        directory: Platform.OS === 'ios' ? 'Documents' : 'Downloads',
        base64: false,
        width: 612,
        height: 792,
        padding: 40,
      };

      // Generate PDF
      const pdf = await RNHTMLtoPDF.convert(options);
      
      if (pdf.filePath) {
        Alert.alert(
          'Success',
          `PDF generated successfully!\nSaved to: ${pdf.filePath}`,
          [
            {
              text: 'OK',
              onPress: () => console.log('PDF saved:', pdf.filePath)
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inspection Report PDF Generator</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Property Information:</Text>
          <Text style={styles.infoText}>Address: {inspectionData.property.address}</Text>
          <Text style={styles.infoText}>Tenant: {inspectionData.property.tenantName}</Text>
          <Text style={styles.infoText}>Inspector: {inspectionData.property.inspectedBy}</Text>
          <Text style={styles.infoText}>Date: {inspectionData.property.inspectionDate}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, isGenerating && styles.buttonDisabled]}
          onPress={generatePDF}
          disabled={isGenerating}
        >
          <Text style={styles.buttonText}>
            {isGenerating ? 'Generating PDF...' : 'Generate PDF Report'}
          </Text>
        </TouchableOpacity>

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Note:</Text>
          <Text style={styles.noteText}>
            • Replace the sample data with your actual inspection data
          </Text>
          <Text style={styles.noteText}>
            • The PDF will be saved to your device's Downloads folder (Android) or Documents folder (iOS)
          </Text>
          <Text style={styles.noteText}>
            • Make sure you have the required permissions for file storage
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#856404',
  },
  noteText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#856404',
  },
});

export default InspectionPDFGenerator;