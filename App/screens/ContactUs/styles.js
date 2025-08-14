import { StyleSheet } from "react-native";
import { AppStyles } from "../../themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.colorSet.background || '#fff',
      },
      webview: {
        flex: 1,
        width: '100%',
      },
      loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
      },
      loaderColor: {
        color: AppStyles.colorSet.appPrimaryColor || '#0000ff',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      errorText: {
        color: AppStyles.colorSet.appRed || '#ff0000',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
      },
})

export default styles