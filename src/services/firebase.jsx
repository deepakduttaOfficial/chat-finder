import { ref, set } from "firebase/database";
import { auth, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const createUser = async (user) => {
  const userRef = await set(ref(db, "users/" + user.uid), {
    id: user.uid,
    name: user?.displayName,
    email: user.email,
    photo: user?.photoURL,
    messageContect: [],
    sendMessage: [],
    recieveMessage: [],
  });
  return userRef;
};

export const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
