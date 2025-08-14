import {
  LOGOUT,
  SIGNIN,
  TEXT_SIZE,
  TEXT_TO_SPEECH,
  UPDATE_TOKENS,
  USER_IMG,
  USER_STATUS
} from '../Constants';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  textSize: 0,
  userImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  userStatus: "Active",
  // TxtToSpeech: false
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        user: action.payload.userData,
        accessToken:
          action.payload.accessToken !== undefined
            ? action.payload.accessToken
            : state.accessToken,
        refreshToken:
          action.payload.refreshToken !== undefined
            ? action.payload.refreshToken
            : state.refreshToken,
      };
      break;

    case UPDATE_TOKENS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };

    case USER_IMG:
      return {
        ...state,
        userImg: action.payload,

      };

    case TEXT_SIZE:
      return {
        ...state,
        textSize: action.payload,

      };

    case USER_STATUS:
      return {
        ...state,
        userStatus: action.payload,

      };


    // case TEXT_TO_SPEECH:
    //   return {
    //     ...state,
    //     TxtToSpeech: action.payload,

    //   };

    case LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
      };

    default:
      break;
  }
  return state;
}
