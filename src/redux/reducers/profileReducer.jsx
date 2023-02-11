import ProfileAction from "../actionTypes/ProfileType";
let initialState = {
  loading: false,
  error: null,
  success: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ProfileAction.IMAGE_UPLOAD_START:
    case ProfileAction.FIELD_UPDATE_START:
      return { ...state, loading: true, error: false, success: false };

    case ProfileAction.IMAGE_UPLOAD_SUCCESS:
    case ProfileAction.FIELD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: action.payload,
      };

    case ProfileAction.IMAGE_UPLOAD_FAIL:
    case ProfileAction.FIELD_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
