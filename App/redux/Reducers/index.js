import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import LoaderReducer from './LoaderReducer';
import alertReducer from './AlertReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './cartReducer';
import filterReducer from './filterReducer';
 
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const cartPersistConfig = {
//   key: 'cart',
//   storage: AsyncStorage,
// };

const RootReducer = combineReducers({
  AuthReducer: persistReducer(persistConfig, AuthReducer),
  LoaderReducer,
  alertReducer,
  // filterReducer,
  // cartReducer: persistReducer(cartPersistConfig, cartReducer),
});

export default RootReducer;
