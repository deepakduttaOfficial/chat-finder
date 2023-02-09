import { MessageAction } from "../actionTypes/MessageAction";

let initialState = {
  currentGroup: null,
  loading: false,
  error: null,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MessageAction.SEND_MESSAGE_START:
      return { ...state, loading: true, error: null, success: false };

    case MessageAction.SEND_MESSAGE_SUCCESS:
      return { ...state, loading: false, error: null, success: true };

    case MessageAction.SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case MessageAction.CURRENT_GROUP:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
        currentGroup: action.payload,
      };

    default:
      return state;
  }
};
