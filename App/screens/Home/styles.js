// import { StyleSheet } from "react-native";
// import { AppStyles, Metrics, MetricsMod, MetricsVertical } from "../../themes";
// import { font } from '../../assets/fonts/Inter_24pt-ExtraLightItalic.ttf'
// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//     },
//     container: {
//         flex: 1,
//         width: "90%",
//         alignSelf: 'center',
//     },
//     searchContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         marginTop: MetricsVertical.baseMarginIII,
//         backgroundColor: AppStyles.colorSet.white,
//         elevation: 0.5
//     },
//     icon: {
//         width: 20,
//         height: 20,
//         marginHorizontal: 5,
//     },
//     input: {
//         flex: 1,
//         paddingVertical: 8,
//         paddingHorizontal: 5,
//         fontFamily: AppStyles.fontFamily.LatoBold,
//         fontSize: 20
//     },
//     mealOptionsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         flexWrap: 'wrap',
//         marginTop: MetricsMod.baseMarginIII,
//         paddingHorizontal: 2,
//     },
//     mealOption: {
//         alignItems: "center",
//         marginHorizontal: 10,
//     },
//     mealText: {
//         fontSize: 13,
//         marginBottom: 8,
//         fontFamily: AppStyles.fontFamily.LatoBold,
//         // fontWeight:'500',
//         // color: AppStyles.colorSet.appBlack
//         color: AppStyles.colorSet.appBlack,
//         marginTop: 3

//     },
//     imageView: {
//         padding: 3,
//         backgroundColor: AppStyles.colorSet.white,
//         borderRadius: MetricsMod.six

//     },
//     DinnerImgView: {
//         padding: 13,
//         backgroundColor: AppStyles.colorSet.white,
//         borderRadius: MetricsMod.six
//     },
//     mealImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 8,
//     },
//     dinnerImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 8,
//     },
//     selectedMealBorder: {
//         borderWidth: 2,
//         borderColor: "red",
//         borderRadius: 10,
//     },
//     mealOptionTxt: {
//         marginLeft: MetricsMod.nine,
//         fontSize: 20,
//         fontFamily: AppStyles.fontFamily.LatoBlack,
//         color: AppStyles.colorSet.appBlack2,
//         marginTop: MetricsMod.baseMargin
//     },
//     listingTxt: {
//         fontSize: 20,
//         color: AppStyles.colorSet.appBlack2,
//         fontFamily: AppStyles.fontFamily.LatoBlack,
//         marginTop: MetricsMod.baseMarginIII,
//         marginLeft: MetricsMod.baseMargin,
//         marginBottom: MetricsMod.six,

//     },
//     textInput: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         marginBottom: 16,
//     },
//     optionContainer: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         gap: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     option: {
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 5,
//         backgroundColor: "#00000080",

//     },
//     selectedOption: {
//         backgroundColor: AppStyles.colorSet.appRed,
//     },
//     optionText: {
//         color: AppStyles.colorSet.white,
//         fontSize: 15,
//         fontFamily: AppStyles.fontFamily.LatoRegular
//     },
//     selectedTxt: {
//         color: AppStyles.colorSet.white,
//         fontSize: 16,
//         fontFamily: AppStyles.fontFamily.LatoBoldItalic
//     },
//     headingText: {
//         fontSize: 20,
//         fontFamily: AppStyles.fontFamily.LatoBlack,
//         color: AppStyles.colorSet.appBlack2,
//         width: '95%',
//         alignSelf: 'center',
//         marginTop: MetricsMod.baseMarginIII,
//         marginBottom: MetricsMod.baseMargin
//     },
//     fab: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         backgroundColor: AppStyles.colorSet.appPrimaryColor,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         borderRadius: 30,
//         elevation: 5,
//     },
//     fabText: {
//         color: '#fff',
//         marginLeft: 8,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     listContainer: {
//         padding: 16,
//         paddingBottom: 80, // Extra padding at bottom for FAB
//       },
//       listHeaderContainer: {
//         paddingHorizontal: 16,
//         paddingTop: 16,
//         paddingBottom: 8,
//       },
//       listHeaderText: {
//         fontSize: 22,
//         fontFamily: AppStyles.fontFamily.LatoBlack,
//         color: AppStyles.colorSet.appBlack2,
//       },
//       listSubHeaderText: {
//         fontSize: 14,
//         fontFamily: AppStyles.fontFamily.LatoRegular,
//         color: "#666",
//         marginTop: 4,
//       },
//       container: {
//         flexDirection: "row",
//         backgroundColor: "white",
//         borderRadius: 12,
//         marginBottom: 16,
//         padding: 12,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//         alignItems: "center",
//       },
//       imageContainer: {
//         width: 70,
//         height: 70,
//         borderRadius: 10,
//         overflow: "hidden",
//         backgroundColor: "#f0f0f0",
//       },
//       image: {
//         width: "100%",
//         height: "100%",
//       },
//       contentContainer: {
//         flex: 1,
//         marginLeft: 12,
//       },
//       propertyName: {
//         fontSize: 16,
//         fontFamily: AppStyles.fontFamily.LatoBold,
//         color: AppStyles.colorSet.appBlack2,
//         marginBottom: 6,
//       },
//       infoRow: {
//         flexDirection: "row",
//         marginBottom: 6,
//       },
//       infoItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginRight: 16,
//       },
//       infoIcon: {
//         marginRight: 4,
//       },
//       infoText: {
//         fontSize: 13,
//         fontFamily: AppStyles.fontFamily.LatoRegular,
//         color: "#666",
//       },
//       ownerContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//       },
//       ownerText: {
//         fontSize: 13,
//         fontFamily: AppStyles.fontFamily.LatoRegular,
//         color: "#666",
//       },
//       arrowIcon: {
//         marginLeft: 8,
//       },
//       emptyContainer: {
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 40,
//       },
//       emptyText: {
//         fontSize: 18,
//         fontFamily: AppStyles.fontFamily.LatoBold,
//         color: "#888",
//         marginTop: 16,
//       },
//       emptySubText: {
//         fontSize: 14,
//         fontFamily: AppStyles.fontFamily.LatoRegular,
//         color: "#888",
//         textAlign: "center",
//         marginTop: 8,
//       },
// })

// export default styles