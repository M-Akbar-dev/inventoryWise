import { StyleSheet } from 'react-native';
import { AppStyles } from '../../themes';
const styles = StyleSheet.create({

  Successbtn :{
    backgroundColor:"#2d906D",
    padding:10,
    borderRadius:10,
    justifyContent:'center'
  },
  alertContainer :{
    position:'absolute',
    left:10,
    right:10,
    top:80,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:"rgba(0.0.0.0.5)",
    zIndex:1000
  },
  alerContent :{
    borderRadius : 10,
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    padding:2
  },
  success :{
    backgroundColor:"#2d906d"
  },
  error :{
    backgroundColor:AppStyles.colorSet.redI
  },
  warning :{
    backgroundColor:AppStyles.colorSet.yellow,
    borderRadius:10,
  },
  messageContainer :{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
  alertMessage :{
    fontSize:15,
    fontWeight:'bold',
    color:AppStyles.colorSet.white,
    alignSelf:"flex-start",
    left:3
  },
  colseButton :{
    padding :10,
    borderRadius:5,
    justifyContent:'center'
  },
  successButton :{
    backgroundColor:AppStyles.colorSet.transparent,
    padding:10,
    borderRadius:10,
    justifyContent:'center'
  },

  errorButton :{
    backgroundColor:AppStyles.colorSet.transparent,
    padding:10,
    borderRadius:10,
    justifyContent:'center'
  },

  warningButton :{
    backgroundColor:AppStyles.colorSet.transparent,
    padding:10,
    borderRadius:10,
    justifyContent:'center'
  },

  alertRightError :{
    backgroundColor:"#bd0914",
    justifyContent:'center',
    alignItems:'center',
    width:"16%",
    height:"131%",
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
    right : 9.5
  },

  alertRightSuccess :{
    backgroundColor:"#39b089",
    justifyContent:'center',
    alignItems:'center',
    width:"16%",
    height:"131%",
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
    right : 9.5
  },

  alertRightWarning :{
    backgroundColor:"#e4a300",
    justifyContent:'center',
    alignItems:'center',
    width:"16%",
    height:"131%",
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8,
    right : 9.5
  }

  
  // alertContainer: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
  //   zIndex: 1000,
  // },
  // alertContent: {
  //   backgroundColor: '#fff',
  //   padding: 20,
  //   borderRadius: 10,
  // },
  // success: {
  //   backgroundColor: '#dff0df',
  // },
  // error: {
  //   backgroundColor: '#f4cccc',
  // },
  // alertImage: {
  //   width: 50,
  //   height: 50,
  //   marginBottom: 10,
  //   alignSelf: 'center'
  // },
  // alertText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 5,
  // },
  // alertMessage: {
  //   fontSize: 16,
  //   marginBottom: 15,
  // },
  // closeButton: {
  //   backgroundColor: '#333',
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // closeButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   textAlign: 'center',
  // },
});

export default styles;
