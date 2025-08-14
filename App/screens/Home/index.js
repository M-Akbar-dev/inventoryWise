
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  Alert,
} from "react-native"
import CustomHeader from "../../Component/customHeader"
import { AppStyles } from "../../themes"
import VectorIconComponent from "../../Component"
import { ICON_TYPES } from "../../constants/constant"
import { MAIN_SCREENS } from "../../constants/screens"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { LoaderAction } from "../../redux/Actions"
import { useNavigation } from "@react-navigation/native"
import AlertMiddleware from "../../redux/Middlewares/AlertMiddleware"

const { width } = Dimensions.get("window")

const PropertyCard = ({ property, onPress, props, onDelete }) => {
  const navigation = useNavigation()
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={[cardStyles.cardWrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        style={cardStyles.container}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Status Indicator */}
        <View style={cardStyles.statusIndicator} />

        {/* Image Container with Overlay */}
        <View style={cardStyles.imageContainer}>
          <Image
            source={{ uri: `https://api.inventorywise.co.uk/uploads/${property?.main_img}` }}
            style={cardStyles.image}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <View style={cardStyles.imagePlaceholder}>
              <VectorIconComponent name="home" size={24} color="#ccc" type={ICON_TYPES.AntDesign} />
            </View>
          )}

          <View style={cardStyles.typeBadge}>
            <Text style={cardStyles.typeBadgeText}>{property.types}</Text>
          </View>

          <TouchableOpacity style={cardStyles.editButton} onPress={() => { navigation.navigate(MAIN_SCREENS.EDIT_PROPERTY, { id: property?.id }) }}>
            <VectorIconComponent name="edit" size={16} color="#FFFFFF" type={ICON_TYPES.MaterialIcons} />
          </TouchableOpacity>

          <TouchableOpacity style={cardStyles.deleteButton} onPress={() => {
            Alert.alert(
              "Delete Property",
              "Are you sure you want to delete this property?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => onDelete(property?.id),
                },
              ],
              { cancelable: true }
            );
          }}
          >
            <VectorIconComponent name="delete" size={16} color={AppStyles.colorSet.red} type={ICON_TYPES.AntDesign} />
          </TouchableOpacity>

        </View>

        {/* Content Container */}
        <View style={cardStyles.contentContainer}>
          {/* Header Row */}
          <View style={cardStyles.headerRow}>
            <Text style={cardStyles.propertyName} numberOfLines={1}>
              {property.types}
            </Text>
          </View>

          {/* Info Grid */}
          <View style={cardStyles.infoGrid}>
            <View style={cardStyles.infoItem}>
              <View style={cardStyles.infoIconContainer}>
                <VectorIconComponent
                  name="bed"
                  size={14}
                  color={AppStyles.colorSet.appPrimaryColor}
                  type={ICON_TYPES.MaterialCommunityIcons}
                />
              </View>
              <Text style={cardStyles.infoText}>
                {property.rooms} {property.rooms === 1 ? "Room" : "Rooms"}
              </Text>
            </View>

            <View style={cardStyles.infoItem}>
              <View style={cardStyles.infoIconContainer}>
                <VectorIconComponent
                  name="calendar"
                  size={14}
                  color={AppStyles.colorSet.appPrimaryColor}
                  type={ICON_TYPES.AntDesign}
                />
              </View>
              <Text style={cardStyles.infoText}>{formatDate(property.created)}</Text>
            </View>
          </View>

          {/* View Details Button */}
          <TouchableOpacity style={cardStyles.viewDetailsButton} onPress={onPress}>
            <Text style={cardStyles.viewDetailsText}>View Details</Text>
            <VectorIconComponent
              name="chevron-right"
              size={16}
              color={AppStyles.colorSet.appPrimaryColor}
              type={ICON_TYPES.Feather}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

function Home(props) {
  const { navigation } = props
  const [propertyData, setPropertyData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const user = useSelector((state) => state.AuthReducer.user)
  const token = user?.jwtToken
  const dispatch = useDispatch()

  useEffect(() => {
    getPropertiesByUserId()
  }, [])

  const getPropertiesByUserId = async () => {
    dispatch(LoaderAction.LoaderTrue())
    try {
      const response = await axios.get(`https://api.inventorywise.co.uk/properties/getByUserId/${user?.id}`, {
        headers: {
          Authorization: token,
        },
      })
      setPropertyData(response?.data?.rows.reverse())
      dispatch(LoaderAction.LoaderFalse())
    } catch (error) {
      dispatch(LoaderAction.LoaderFalse())
      console.error("Error fetching properties:", error.message)
      if (error.response) {
        console.error("Response error:", error.response.data)
        console.error("Status:", error.response.status)
      }
      throw error
    }
  }

  const deleteProperty = async (id) => {
    // alert(id)
    dispatch(LoaderAction.LoaderTrue())
    try {
      const response = await axios.delete(`https://api.inventorywise.co.uk//properties/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      // setPropertyData(response?.data?.rows)
      console.log(response?.data, "this is the response of delete data")
      dispatch(AlertMiddleware.showSuccess(response?.data?.message))
      dispatch(LoaderAction.LoaderFalse())
      getPropertiesByUserId()
    } catch (error) {
      dispatch(LoaderAction.LoaderFalse())
      console.error("Error fetching properties:", error.message)
      if (error.response) {
        console.error("Response error:", error.response.data)
        console.error("Status:", error.response.status)
      }
      throw error
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await getPropertiesByUserId()
    setRefreshing(false)
  }

  const handlePropertyPress = (property) => {
    console.log(`Property pressed: ${property.name}`)
    navigation.navigate(MAIN_SCREENS.PROPERTY_DETAIL_PAGE, { property })
  }

  const handleEditProperty = (property) => {
    console.log(`Edit property: ${property.id}`)
    // navigation.navigate(MAIN_SCREENS.EDIT_PROPERTY_SCREEN, { property })
  }

  const renderAddPropertyBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(MAIN_SCREENS.ADD_PROPERTY_SCREEN)
        }}
        style={cardStyles.fab}
      >
        <View style={cardStyles.fabIconContainer}>
          <VectorIconComponent name="add" size={24} color={AppStyles.colorSet.white} type={ICON_TYPES.MaterialIcons} />
        </View>
        <Text style={cardStyles.fabText}>Add Property</Text>
      </TouchableOpacity>
    )
  }

  const renderEmptyList = () => (
    <View style={cardStyles.emptyContainer}>
      <View style={cardStyles.emptyIconContainer}>
        <VectorIconComponent name="home" size={80} color="#E5E7EB" type={ICON_TYPES.AntDesign} />
      </View>
      <Text style={cardStyles.emptyTitle}>No Properties Found</Text>
      <Text style={cardStyles.emptySubtitle}>Start building your property portfolio by adding your first property</Text>
      {/* <TouchableOpacity
        style={cardStyles.emptyActionButton}
        onPress={() => navigation.navigate(MAIN_SCREENS.ADD_PROPERTY_SCREEN)}
      >
        <VectorIconComponent name="add" size={20} color="#FFFFFF" type={ICON_TYPES.MaterialIcons} />
        <Text style={cardStyles.emptyActionText}>Add Your First Property</Text>
      </TouchableOpacity> */}
    </View>
  )

  const renderPropertyItem = ({ item, index }) => (
    <PropertyCard property={item} onPress={() => handlePropertyPress(item)} onDelete={deleteProperty} index={index} />
  )

  const renderHeader = () => (
    <View style={cardStyles.headerContainer}>
      <View style={cardStyles.headerContent}>
        <View>
          <Text style={cardStyles.headerTitle}>My Properties</Text>
          <Text style={cardStyles.headerSubtitle}>
            {propertyData.length} {propertyData.length === 1 ? "property" : "properties"} in your portfolio
          </Text>
        </View>
        {/* <View style={cardStyles.headerActions}>
          <TouchableOpacity style={cardStyles.headerActionButton}>
            <VectorIconComponent name="search" size={20} color="#666" type={ICON_TYPES.MaterialIcons} />
          </TouchableOpacity>
          <TouchableOpacity style={cardStyles.headerActionButton}>
            <VectorIconComponent name="filter-list" size={20} color="#666" type={ICON_TYPES.MaterialIcons} />
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Stats Row */}
      {/* <View style={cardStyles.statsContainer}>
        <View style={cardStyles.statItem}>
          <Text style={cardStyles.statNumber}>{propertyData.length}</Text>
          <Text style={cardStyles.statLabel}>Total</Text>
        </View>
        <View style={cardStyles.statDivider} />
        <View style={cardStyles.statItem}>
          <Text style={cardStyles.statNumber}>{propertyData.filter((p) => p.status === "active").length}</Text>
          <Text style={cardStyles.statLabel}>Active</Text>
        </View>
        <View style={cardStyles.statDivider} />
        <View style={cardStyles.statItem}>
          <Text style={cardStyles.statNumber}>$12.5K</Text>
          <Text style={cardStyles.statLabel}>Monthly</Text>
        </View>
      </View> */}
    </View>
  )

  const body = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <StatusBar backgroundColor={AppStyles.colorSet.appPrimaryColor} barStyle="light-content" translucent={false} />
        <SafeAreaView style={{ flex: 1 }}>
          <CustomHeader title={props?.route?.name} />
          <FlatList
            data={propertyData}
            renderItem={renderPropertyItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={cardStyles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyList}
            ListHeaderComponent={renderHeader}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
          {renderAddPropertyBtn()}
        </SafeAreaView>
      </View>
    )
  }

  return body()
}

const cardStyles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },

  // Header Styles
  headerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: AppStyles.fontFamily.LatoBlack,
    color: AppStyles.colorSet.appBlack2,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.LatoBlack,
    color: AppStyles.colorSet.appPrimaryColor,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
  },

  // Card Styles
  cardWrapper: {
    marginBottom: 16,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statusIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#10B981",
    zIndex: 10,
  },

  // Image Styles
  imageContainer: {
    height: 180,
    position: "relative",
    backgroundColor: "#F3F4F6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  typeBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: AppStyles.fontFamily.LatoBold,
  },
  editButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppStyles.colorSet.whiteBlur,
    borderWidth: 1,
    borderColor: AppStyles.colorSet.red,
    alignItems: "center",
    justifyContent: "center",
  },

  // Content Styles
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 18,
    fontFamily: AppStyles.fontFamily.LatoBlack,
    color: AppStyles.colorSet.appBlack2,
    flex: 1,
    marginRight: 12,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontFamily: AppStyles.fontFamily.LatoBlack,
    color: AppStyles.colorSet.appPrimaryColor,
  },
  priceSubtext: {
    fontSize: 12,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
  },

  // Info Grid
  infoGrid: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppStyles.colorSet.appPrimaryColor + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  infoText: {
    fontSize: 13,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
    flex: 1,
  },

  // Owner Row
  ownerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  ownerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppStyles.colorSet.appPrimaryColor + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  ownerText: {
    fontSize: 13,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  // View Details Button
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: AppStyles.colorSet.appPrimaryColor + "10",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.LatoBold,
    color: AppStyles.colorSet.appPrimaryColor,
  },

  // FAB Styles
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: AppStyles.colorSet.appPrimaryColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 8,
  },
  fabIconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: AppStyles.colorSet.white,
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.LatoBold,
  },

  // Empty State
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: AppStyles.fontFamily.LatoBlack,
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.LatoRegular,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  emptyActionButton: {
    backgroundColor: AppStyles.colorSet.appPrimaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  emptyActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: AppStyles.fontFamily.LatoBold,
  },
})

export default Home
