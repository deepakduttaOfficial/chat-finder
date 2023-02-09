import ContactListAction from "../actionTypes/ContactListAction";

let initialState = {
  contactList: [],
  loading: false,
  error: null,
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ContactListAction.GET_CONTACT_LIST:
      return { ...state, contactList: action.payload };

    case ContactListAction.LOADING_CONTACT_LIST:
      return { ...state, loading: true };

    case ContactListAction.SUCCESS_ADD_CONTACT_LIST:
      return {
        ...state,
        loading: false,
        error: false,
        success: action.payload,
      };

    case ContactListAction.FAIL_ADD_CONTACT_LIST:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
