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
      return { ...state, loading: true, error: null, success: false };
    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
        currentUser: action.payload,
      };
    case ActionType.REGISTER_FAIL:
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
