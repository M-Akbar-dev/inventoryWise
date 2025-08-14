// actions/AlertAction.js
import {
    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT,
    HIDE_ALERT,
    SHOW_WARNING_ALERT,
  } from '../Constants';
  
  export const showSuccessAlert = (message) => ({
    type: SHOW_SUCCESS_ALERT,
    payload: { message },
  });
  
  export const showErrorAlert = (message) => ({
    type: SHOW_ERROR_ALERT,
    payload: { message },
  });
  export const showWarningAlert = (message) => ({
    type: SHOW_WARNING_ALERT,
    payload: { message },
  });
  
  export const hideAlert = () => ({
    type: HIDE_ALERT,
  });
  