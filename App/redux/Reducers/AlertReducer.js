// reducers/alertReducer.js
import {
    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT,
    HIDE_ALERT,
    SHOW_WARNING_ALERT,
  } from '../Constants';
  
  const initialState = {
    visible: false,
    type: '',
    message: '',
  };
  
  export default function alertReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_SUCCESS_ALERT:
          return {
            ...state,
            visible: true,
            type: 'success',
            message: action.payload.message,
          };
        case SHOW_ERROR_ALERT:
          return {
            ...state,
            visible: true,
            type: 'error',
            message: action.payload.message,
          };

          case SHOW_WARNING_ALERT:
            return {
              ...state,
              visible: true,
              type: 'warning',
              message: action.payload.message,
            };
        case HIDE_ALERT:
          return {
            ...state,
            visible: false,
            type: '',
            message: '',
          };
        default:
          return state;
      }
  }
  