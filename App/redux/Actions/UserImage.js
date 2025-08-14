import React, {Component} from 'react';
import { USER_IMG } from '../Constants';

export class UserImage extends Component {
  static fetchUserImage(data) {
    return {type: USER_IMG, payload: data};
  }
 
}

export default UserImage;