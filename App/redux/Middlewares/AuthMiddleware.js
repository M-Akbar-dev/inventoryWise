import moment from 'moment';
import React, { Component } from 'react';
import { apiGetWithParams, apiPost, apiPostwithOutToken } from '../../Config/Axios/Axios';
import { LoaderAction } from '../Actions';
import AlertMiddleware from './AlertMiddleware';

export class AuthMiddleware extends Component {

  static Login({ payload }) {
    return async (dispatch) => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        const response = await apiPost('/v2/auth/login', payload);
  
        if (response?.success) {
          dispatch(AlertMiddleware.showSuccess("Logged In Successfully"));
          return response;
        } else {
          const message = response?.message || "Login failed.";
          dispatch(AlertMiddleware.showErrorAlert(message));
          throw new Error(message);
        }
      } catch (e) {
        const errMsg = e?.message || "An unexpected error occurred";
        console.error("Login Middleware Error:", e);
        dispatch(AlertMiddleware.showErrorAlert(errMsg));
        throw e;
      } finally {
        dispatch(LoaderAction.LoaderFalse());
      }
    };
  }
  
  static forgotPassword({ payload }) {
    console.log(payload , "this is my best forgot password payload")
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await apiPostwithOutToken('/v2/auth/forgot-password', payload);
          console.log('Response in forgotPassword434:', response);

          if (response) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showSuccess(response.message || "Request successful"));
            resolve(response);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showErrorAlert("Something went wrong"));
            reject(response);
          }
        } catch (e) {
          console.log('Error in forgot password:', e);
          dispatch(LoaderAction.LoaderFalse());
          dispatch(AlertMiddleware.showErrorAlert(e || "Account Not Found"));
          reject(e);
        }
      });
    };
  }


  static verifyOTP({ payload }) {
    console.log(payload , "this is my best forgot password payload")
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await apiPostwithOutToken('/v2/auth/verify-otp', payload);
          console.log('Response in forgotPassword434:', response);

          if (response) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showSuccess(response.message || "Request successful"));
            resolve(response);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showErrorAlert("Something went wrong"));
            reject(response);
          }
        } catch (e) {
          console.log('Error in forgot password:', e);
          dispatch(LoaderAction.LoaderFalse());
          dispatch(AlertMiddleware.showErrorAlert(e || "Account Not Found"));
          reject(e);
        }
      });
    };
  }


  static resetPassword({ payload }) {
    console.log(payload , "this is my best forgot password payload")
    return async (dispatch) => {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(LoaderAction.LoaderTrue());
          let response = await apiPostwithOutToken('/v2/auth/reset-password', payload);
          console.log('Response in forgotPassword434:', response);

          if (response) {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showSuccess(response.message || "Request successful"));
            resolve(response);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            dispatch(AlertMiddleware.showErrorAlert("Something went wrong"));
            reject(response);
          }
        } catch (e) {
          console.log('Error in forgot password:', e);
          dispatch(LoaderAction.LoaderFalse());
          dispatch(AlertMiddleware.showErrorAlert(e || "Account Not Found"));
          reject(e);
        }
      });
    };
  }


}

export default AuthMiddleware;
