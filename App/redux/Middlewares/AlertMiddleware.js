// middlewares/AlertMiddleware.js
// import { showSuccessAlert, showErrorAlert, hideAlert } from '../actions/AlertAction';

import { hideAlert, showErrorAlert, showSuccessAlert, showWarningAlert } from "../Actions/AlertAction";

export class AlertMiddleware {
  static showSuccess(message) {
    return dispatch => {
      dispatch(showSuccessAlert(message));
      setTimeout(() => dispatch(hideAlert()), 6000);  
    };
  }

  static showErrorAlert(message) {
    return dispatch => {
      dispatch(showErrorAlert(message));
      setTimeout(() => dispatch(hideAlert()), 6000);  
    };
  }

  static showWarning(message) {
    return dispatch => {
      dispatch(showWarningAlert(message));
      setTimeout(() => dispatch(hideAlert()), 6000);  
    };
  }
  static hideAlert() {
    return dispatch => {
      dispatch(hideAlert());
    };
}
}

export default AlertMiddleware;
