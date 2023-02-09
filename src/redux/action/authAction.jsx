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

//Loading
const registerStart = () => ({ type: ActionType.REGISTER_START });
const googleSignupStart = () => ({ type: ActionType.GOOGLE_SIGNUP_START });

// Signed up successfully
const registerSuccess = (payload) => ({
  type: ActionType.REGISTER_SUCCESS,
  payload,
});

const googleSignupSuccess = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_SUCCESS,
  payload,
});

// signed up fail
const registerFail = (payload) => ({
  type: ActionType.REGISTER_FAIL,
  payload,
});

const googleSignupFail = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_FAIL,
  payload,
});

// Set user locali
export const setUser = (payload) => ({
  type: ActionType.SET_USER,
  payload,
});

// Login start
const loginStart = () => ({ type: ActionType.LOGIN_START });
const googleLoginStart = () => ({ type: ActionType.GOOGLE_LOGIN_START });

// Login fail
const loginFail = (payload) => ({
  type: ActionType.LOGIN_FAIL,
  payload,
});
const googleLoginFail = (payload) => ({
  type: ActionType.GOOGLE_LOGIN_FAIL,
  payload,
});

// Login Success
const loginSuccess = (payload) => ({
  type: ActionType.GOOGLE_SIGNUP_SUCCESS,
  payload,
});
const googleLoginSuccess = (payload) => ({
  type: ActionType.GOOGLE_LOGIN_SUCCESS,
  payload,
});

// Registration
export const registerUser =
  ({ name, email, password }) =>
  (dispatch) => {
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

// Google signup
// export const registerUserWithGoogle = () => (dispatch) => {
//   dispatch(googleSignupStart());
//   signInWithPopup(auth, provider)
//     .then(({ user }) => {
//       createUser(user)
//         .then(() => {
//           dispatch(googleSignupSuccess(user));
//         })
//         .catch((error) => {
//           dispatch(googleSignupFail(error.message));
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// SiguIN in with email and password
export const signinWithEmail = (email, password) => (dispatch) => {
  dispatch(loginStart());
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => {
      dispatch(loginFail(error.message));
    });
};

// SingIN with google
export const signInWithGoogle = () => (dispatch) => {
  dispatch(googleLoginStart());
  signInWithPopup(auth, provider)
    .then(({ user }) => {
      createUser(user)
        .then(() => {
          dispatch(googleLoginSuccess(user));
        })
        .catch((error) => {
          dispatch(googleSignupFail(error.message));
        });
    })
    .catch((error) => {
      dispatch(googleSignupFail(error.message));
    });
};
