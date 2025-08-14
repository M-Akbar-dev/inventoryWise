import {
  LOADER_TRUE,
  LOADER_FALSE,
  LOADING_PROGRESS,
  LOADING_PROGRESS_COMPLETE,
} from '../Constants';

const initialState = {
  loading: false,
  loadingProgress: false,
  progress: 0,
};

export default function LoaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADER_TRUE:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOADER_FALSE:
      state = {
        ...state,
        loading: false,
      };
      break;
    case LOADING_PROGRESS:
      state = {
        ...state,
        loadingProgress: true,
        progress: action.payload,
      };
      break;
    case LOADING_PROGRESS_COMPLETE:
      state = {
        ...state,
        loadingProgress: false,
      };
      break;

    default:
      break;
  }
  return state;
}
