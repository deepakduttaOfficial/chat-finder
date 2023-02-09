import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const createUser = async (user) => {
  try {
    const res = await getDoc(doc(db, "users", user.uid));
    console.log(res.exists());
    if (!res.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user?.displayName,
        email: user.email,
        photo: user?.photoURL,
      });
      await setDoc(doc(db, "userCharts", user.uid), {});
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
