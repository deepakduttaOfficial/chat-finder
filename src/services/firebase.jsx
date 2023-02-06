import { ref, set } from "firebase/database";
import { db } from "../config/firebase";

export const createUser = async (user) => {
  const userRef = await set(ref(db, "users/" + user.uid), {
    id: user.uid,
    name: user.displayName,
    email: user.email,
    photo: "",
    messageContect: [],
    sendMessage: [],
    recieveMessage: [],
  });
  return userRef;
};
