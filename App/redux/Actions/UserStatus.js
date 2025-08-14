import React, { Component } from 'react';
import { USER_STATUS } from '../Constants';

export class UserStatus extends Component {
    static fetchUserStatus(data) {
        return { type: USER_STATUS, payload: data };
    }

}

export default UserStatus;