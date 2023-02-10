import ActionType from "../actionTypes/ActionType";
// firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../config/firebase";
import { createUser } from "../../services/firebase";

// Register user------------------------------------------>
// Registration with Email and password**************
const registerStart = () => ({ type: ActionType.REGISTER_START });

const registerSuccess = (payload) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload,
});

const registerFail = (payload) => ({
  type: ActionType.REGISTER_FAIL,
  payload,
});

// Register logic
export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    dispatch(registerStart());
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await createUser(user);
      dispatch(registerSuccess(user));
    } catch (error) {
      dispatch(registerFail(error.message));
    }
  };

// Registration with Google*******************
const googleSignupStart = () => ({ type: ActionType.GOOGLE_SIGNUP_START });

const googleSignupSuccess = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_SUCCESS,
  payload,
});

const googleSignupFail = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_FAIL,
  payload,
});

// Main logic
export const registerUserWithGoogle = () => async (dispatch) => {
  dispatch(googleSignupStart());
  try {
    const { user } = await signInWithPopup(auth, provider);
    await createUser(user);
    dispatch(googleSignupSuccess(user));
  } catch (error) {
    dispatch(googleSignupFail(error.message));
  }
};

// Log in user------------------------------------------>
// Log in with Email and password**************
const loginStart = () => ({ type: ActionType.LOGIN_START });

const loginSuccess = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_SUCCESS,
  payload,
});

const loginFail = (payload) => ({
  type: ActionType.LOGIN_FAIL,
  payload,
});

// Main logic
export const signinWithEmail = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFail(error.message));
  }
};

// Log in with Google**************
const googleLoginStart = () => ({ type: ActionType.GOOGLE_LOGIN_START });

const googleLoginSuccess = (payload) => ({
  type: ActionType.GOOGLE_LOGIN_SUCCESS,
  payload,
});

const googleLoginFail = (payload) => ({
  type: ActionType.GOOGLE_LOGIN_FAIL,
  payload,
});

export const signInWithGoogle = () => async (dispatch) => {
  dispatch(googleLoginStart());
  try {
    const { user } = await signInWithPopup(auth, provider);
    await createUser(user);
    dispatch(googleLoginSuccess(user));
  } catch (error) {
    dispatch(googleLoginFail(error.message));
  }
};

// Initial auth set up
export const setUser = (payload) => ({
  type: ActionType.SET_USER,
  payload,
});
