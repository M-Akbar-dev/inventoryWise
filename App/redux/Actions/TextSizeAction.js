import React, { Component } from 'react';
import { TEXT_SIZE, USER_IMG } from '../Constants';

export class TextSizeAction extends Component {
    static fetchTextSize(data) {
        return { type: TEXT_SIZE, payload: data };
    }

}

export default TextSizeAction;