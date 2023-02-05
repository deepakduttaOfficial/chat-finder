import ActionType from "../actionTypes/ActionType";
// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";

export const registerStart = () => ({ type: ActionType.REGISTER_START });
export const registerSuccess = (payload) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload,
});
export const registerFail = (payload) => ({
  type: ActionType.REGISTER_FAIL,
  payload,
});

export const registerUser =
  ({ name, email, password }) =>
  (dispatch, _) => {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        dispatch(registerSuccess(userCredential.user));
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
      });
  };
