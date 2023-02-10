import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const createUser = async (user) => {
  try {
    const res = await getDoc(doc(db, "users", user.uid));
    if (!res.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user?.displayName,
        email: user.email,
        photo: user?.photoURL,
      });
      await setDoc(doc(db, "userChats", user.uid), {});
    }
    return;
  } catch (error) {
    console.log(error);
  }
};
