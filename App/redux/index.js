import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import RootReducer from './Reducers';
import {persistStore, persistReducer} from 'redux-persist';
import {createLogger} from 'redux-logger';
import { thunk } from 'redux-thunk';

const Store = createStore(
  RootReducer,
  {},
  applyMiddleware(
    // createLogger(),
  thunk
  ),
);


let Persistor = persistStore(Store);

export {Store, Persistor};
