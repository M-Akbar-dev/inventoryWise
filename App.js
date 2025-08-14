import { LogBox, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PaperProvider } from 'react-native-paper'
import RootNavigator from './App/navigation/RootNavigator'
import { AppStyles } from './App/themes'
import { Provider } from 'react-redux'
import { Store } from './App/redux'
import CustomAlert from './App/Component/CustomAlert'
import CustomLoading from './App/Component/customLoading'
import { requestStoragePermission } from './App/Component/PermissionsHandler/PermissionsHandler'

const App = () => {

   
  LogBox.ignoreAllLogs()

  requestStoragePermission()
  return (
    <Provider store={Store}>
      <PaperProvider>
        <RootNavigator/>
        <CustomAlert/>
        <CustomLoading/>
      </PaperProvider>
      </Provider>
  )
}

export default App

const styles = StyleSheet.create({})