import ActionType from "../actionTypes/ActionType";
// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { createUser } from "../../services/firebase";

//Loading
export const registerStart = () => ({ type: ActionType.REGISTER_START });

// Success
export const registerSuccess = (payload) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload,
});

// Error
export const registerFail = (payload) => ({
  type: ActionType.REGISTER_FAIL,
  payload,
});

// Set user locali
export const setUser = (payload) => ({
  type: ActionType.SET_USER,
  payload,
});

// Registration
export const registerUser =
  ({ name, email, password }) =>
  (dispatch, _) => {
    dispatch(registerStart());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        createUser(user)
          .then(() => {
            dispatch(registerSuccess(user));
          })
          .catch((error) => {
            dispatch(registerFail(error.message));
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch(registerFail(error.message));
      });
  };
