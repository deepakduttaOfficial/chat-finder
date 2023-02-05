import ActionType from "../actionTypes/ActionType";
// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export const registerStart = () => ({ type: ActionType.REGISTER_START });
export const registerSuccess = () => ({ type: ActionType.REGISTER_SUCCESS });
export const registerFail = (payload) => ({
  type: ActionType.REGISTER_FAIL,
  payload,
});

export const registerUser =
  ({ name, email, password }) =>
  (dispatch, _) => {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // console.log(user);
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
      });
  };
