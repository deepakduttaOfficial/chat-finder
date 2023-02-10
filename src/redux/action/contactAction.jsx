import ContactListAction from "../actionTypes/ContactListAction";
import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// Fetching Animatin
export const getContactLoading = () => ({
  type: ContactListAction.LOADING_CONTACT_LIST,
});

export const successAddContact = (payload) => ({
  type: ContactListAction.SUCCESS_ADD_CONTACT_LIST,
  payload,
});

export const failAddContact = (payload) => ({
  type: ContactListAction.FAIL_ADD_CONTACT_LIST,
  payload,
});

export const setContactList = (payload) => ({
  type: ContactListAction.GET_CONTACT_LIST,
  payload,
});

// Find all contact list
export const findUser =
  ({ email, setUser }) =>
  async () => {
    setUser({
      error: null,
      receiverInfo: null,
      loading: true,
    });
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser({
          error: "User not found",
          receiverInfo: null,
          loading: false,
        });
      } else {
        querySnapshot.forEach((doc) => {
          setUser({
            error: null,
            receiverInfo: doc.data(),
            loading: false,
          });
        });
      }
    } catch (error) {
      setUser({
        error: error,
        receiverInfo: null,
        loading: false,
      });
    }
  };

// Add contact
export const selectUser =
  ({ combinedId, receiverInfo, currentUser }) =>
  async (dispatch) => {
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        // Create a chats
        dispatch(getContactLoading());
        await setDoc(doc(db, "chats", combinedId), { message: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".receiverInfo"]: {
            uid: receiverInfo?.uid,
            displayName: receiverInfo?.displayName,
            email: receiverInfo?.email,
            photoURL: receiverInfo?.photo,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", receiverInfo.uid), {
          [combinedId + ".receiverInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            email: currentUser?.email,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        dispatch(
          successAddContact({
            title: "Success",
            desc: "The user has been successfully added to your contact",
          })
        );
      } else {
        dispatch(failAddContact("User already Exist"));
      }
    } catch (error) {
      dispatch(failAddContact(error));
    }
  };
