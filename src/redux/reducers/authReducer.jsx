import ActionType from "../actionTypes/ActionType";

const initialState = {
  success: false,
  error: null,
  loading: false,
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REGISTER_START:
    case ActionType.REGISTER_START:
    case ActionType.GOOGLE_SIGNUP_START:
    case ActionType.LOGIN_START:
    case ActionType.GOOGLE_LOGIN_START:
      return { ...state, loading: true, error: null, success: false };

    case ActionType.REGISTER_SUCCESS:
    case ActionType.SET_USER:
    case ActionType.GOOGLE_SIGNUP_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
    case ActionType.GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        currentUser: action.payload,
      };

    case ActionType.REGISTER_FAIL:
    case ActionType.GOOGLE_SIGNUP_FAIL:
    case ActionType.LOGIN_FAIL:
    case ActionType.GOOGLE_LOGIN_FAIL:
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
