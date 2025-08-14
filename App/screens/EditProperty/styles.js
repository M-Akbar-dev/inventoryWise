import { StyleSheet } from "react-native";
import { AppStyles, MetricsMod, MetricsVertical } from "../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        width: "95%",
        alignSelf: 'center'
    },
    scrollContainer: {
        flexGrow: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    horizontalScroll: {
        maxHeight: 60, // Fixed height for horizontal scroll container
        marginBottom: 20,
    },
    horizontalScrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    reportButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    selectedReportButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    buttonText: {
        fontSize: 14,
        color: '#333',
    },
    selectedButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // propertyImagePicContainer: {
    //     width: "100%",
    //     height: 200,
    //     backgroundColor: '#f0f0f0',
    //     borderRadius: 8,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderColor: AppStyles.colorSet.gray,
    //     borderWidth: 1,
    // },
    datePickerView: {
        width: "100%",
        height: 50,
        backgroundColor: AppStyles.colorSet.lightGray,
        borderRadius: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: AppStyles.colorSet.gray,
        borderWidth: 1,
        flexDirection: 'row'
    },
    errorText: {
        color: AppStyles.colorSet.appRed,
        fontSize: 12,
        marginTop: 4,
    },
    textInput: {
        width: "100%",
        paddingVertical: 5,
    },
    formLabel:{
        fontSize: 16,
        color: AppStyles.colorSet.black,
        marginVertical: 8,
        fontFamily: AppStyles.fontFamily.LatoBold,
    },
    submitButton: {
        backgroundColor: AppStyles.colorSet.appPrimaryColor,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: AppStyles.colorSet.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleContainer: {
        marginVertical: 12,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        padding: 12,
        borderRadius: 8,
    },
    toggleLabel: {
        fontSize: 16,
        color: AppStyles.colorSet.black,
        marginBottom: 8,
        fontWeight: '600'
    },
    toggleGroup: {
        flexDirection: 'row',
        gap: 12,
    },
    toggleButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        alignItems: 'center',
        backgroundColor: AppStyles.colorSet.white,
    },
    selectedToggle: {
        backgroundColor: AppStyles.colorSet.appPrimaryColor,
        borderColor: AppStyles.colorSet.appPrimaryColor,
    },
    toggleText: {
        fontSize: 14,
        color: AppStyles.colorSet.gray,
    },
    selectedToggleText: {
        color: AppStyles.colorSet.white,
        fontWeight: 'bold'
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colorSet.appPrimaryColor,
        marginTop: 24,
        marginBottom: 16
    },
    errorBorder: {
        borderColor: AppStyles.colorSet.appRed,
    },

    toggleHeader: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginBottom: 8,
    
    },
    meterImageContainer: {
        marginTop: 12,
        marginLeft: 8
    },

   
    imageUploadLabel: {
        fontSize: 14,
        color: AppStyles.colorSet.black,
        marginBottom: 8
    },
    toggleGroup: {
        flexDirection: 'row',
        gap: 12,
        width: 150
    },

    imagePreviewContainer: {
      marginRight: 8,
      alignSelf:'center',
       width:"100%",
      alignItems:'center'
    },
    cancelIcon: {
        position: 'absolute',
        top: 3,
        right: 12,
        backgroundColor: AppStyles.colorSet.white,
        borderRadius: 10,
        padding: 2
    },
    imageUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    meterImageButton: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: AppStyles.colorSet.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        overflow: 'hidden'
    },
    meterImagePreview: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 8,
      },
    roomContainer: {
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 8,
        padding: 16,
        marginVertical: 12,
    },
    roomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    roomTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: AppStyles.colorSet.appPrimaryColor,
    },
    conditionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    // conditionLabel: {
    //     width: 100,
    //     fontSize: 14,
    //     color: AppStyles.colorSet.gray,
    // },
    conditionInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 4,
        paddingHorizontal: 8,
        color:"rgba(33, 37, 41, 0.5)",
    },
    descriptionInput: {
        height: 80,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 4,
        padding: 8,
        marginVertical: 8,
    },
    imageUploadContainer: {
        marginTop: 12,
    },
    uploadLabel: {
        fontSize: 14,
        color: AppStyles.colorSet.appPrimaryColor,
        marginBottom: 8,
    },
    uploadButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 4,
        marginRight: 8,
    },
    thumbnail: {
        width: 80,
        height: 80,
        marginRight: 8,
        borderRadius: 4,
      },
    
    removeImageButton: {
        position: 'absolute',
        top: 5,
        right: 10,
        backgroundColor: AppStyles.colorSet.white,
        borderRadius: 10,
    },
    addRoomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.appPrimaryColor,
        borderRadius: 8,
        marginTop: 16,
    },
    addRoomButtonText: {
        marginLeft: 8,
        color: AppStyles.colorSet.appPrimaryColor,
        fontWeight: '600',
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16
    },
    addSmallButton: {
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.appPrimaryColor
    },
    roomContainer: {
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    roomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    roomTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: AppStyles.colorSet.appPrimaryColor
    },
    conditionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    conditionLabel: {
        width: 80,
        fontSize: 14,
        color: AppStyles.colorSet.appBlack,
        fontFamily: AppStyles.fontFamily.LatoBold
    },
    // conditionInput: {
    //     flex: 1,
    //     height: 40,
    //     borderWidth: 1,
    //     borderColor: AppStyles.colorSet.gray,
    //     borderRadius: 4,
    //     paddingHorizontal: 8
    // },
    // imagePreview:{
    //     height: 100,
    //     width: 100,
    // },
    imagePreviewM:{
        height: 200,
        width: 400,
    },
    imagePreview: {
        width: MetricsMod.threeEighty,
        height: MetricsMod.twoHundred,
        borderRadius: 8,
        marginRight: 8,
    },
    cancelIconM: {
        position: 'absolute',
        top: 2,
        right: 40,
        backgroundColor: AppStyles.colorSet.white,
        borderRadius: 10,
        padding: 2,
        zIndex: 1
    },
    addMoreButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        borderRadius: 8
    },
    propertyImagePicContainer: {
      flexDirection: 'row',
      padding: 8,
      width:  "100%",
      // width: '80%',
      height: 200,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: AppStyles.colorSet.gray,
      borderWidth: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        width: '90%',
        height: '70%',
        borderRadius: 10,
        padding: 20,
      },
      signatureSection: {
        marginVertical: 20,
      },
      signatureButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: AppStyles.colorSet.appPrimaryColor,
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
      },
      signatureButtonText: {
        marginLeft: 10,
        color: AppStyles.colorSet.appPrimaryColor,
      },
      signaturePreviewContainer: {
        marginTop: 15,
        alignItems: 'center',
        position: 'relative',
      },
      signaturePreview: {
        width: 200,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
      removeSignatureButton: {
        position: 'absolute',
        right: 10,
        top: 10,
      },
      signatureSection: {
        marginVertical: 20,
      },
      signatureContainer: {
        height: 200,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.appPrimaryColor,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
      },
      signatureCanvas: {
        flex: 1,
      },
      signatureButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
      },
      signatureActionButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
      },
      clearButton: {
        backgroundColor: '#ff4444',
      },
      saveButton: {
        backgroundColor: AppStyles.colorSet.appPrimaryColor,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      signaturePreviewContainer: {
        marginTop: 15,
        alignItems: 'center',
        position: 'relative',
      },
      signaturePreview: {
        width: 200,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      },
      removeSignatureButton: {
        position: 'absolute',
        right: 10,
        top: 10,
      },
      rowView: {
        flexDirection: 'row',
        width: "90%",
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: MetricsVertical.baseMargin,
     },
    headingView: {
        width: "90%",
        alignSelf: 'center',
        marginTop: MetricsVertical.doubleBaseMargin
    },
    headingText: {
        fontSize: 25,
        color: AppStyles.colorSet.black,
        fontFamily: AppStyles.fontFamily.LatoBlack
        // fontWeight:'bold'
    },
    backCircleView: {
        height: MetricsMod.thirty,
        width: MetricsMod.thirty,
        borderRadius: MetricsMod.thirty / 2,
        borderWidth: 1,
        borderColor: AppStyles.colorSet.gray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signaturePickerSection: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'spaceBetween',
        minHeight: 50,
      },
      signaturePickerText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
      },
      modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: MetricsMod,
        padding: MetricsMod.ten,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      signatureContainer: {
        flex: 1,
        margin: MetricsMod.ten,
      },
      signatureCanvas: {
        width: '100%',
        height: '100%',
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: MetricsMod.ten,
        borderTopWidth: 1,
        borderColorTopColor: '#ccc',
      },
      modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 100,
        alignItems: 'center',
      },
      clearButton: {
        backgroundColor: '#555555',
      },
      saveButton: {
        backgroundColor: '#333333',
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
      },
      errorBorder: {
        borderColor: '#f00',
      },
})

export default styles