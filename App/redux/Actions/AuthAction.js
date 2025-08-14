import React, { Component } from 'react';
import {

  LOGOUT,
  SIGNIN,
  UPDATE_TOKENS,

} from '../Constants';

export class AuthAction extends Component {
  static Signin(data) {
    return {
      type: SIGNIN,
      payload: {
        userData: data,
        accessToken: data.token,
        // refreshToken: data.refreshToken,
      },
    };
  }
  static UpdateTokens(tokens) {
    return { type: UPDATE_TOKENS, payload: tokens };
  }

  static Logout() {
    return { type: LOGOUT };
  }


}

export default AuthAction;
