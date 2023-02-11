import { MessageAction } from "../actionTypes/MessageAction";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";

const messageStart = () => ({ type: MessageAction.SEND_MESSAGE_START });
const messageSendSuccess = () => ({
  type: MessageAction.SEND_MESSAGE_SUCCESS,
});

const messageSendFail = (payload) => ({
  type: MessageAction.SEND_MESSAGE_FAIL,
  payload,
});

export const setCurrentGroup = (payload) => ({
  type: MessageAction.CURRENT_GROUP,
  payload,
});

export const sendMessage =
  ({ currentGroup, currentUser, message, img, setImg }) =>
  async (dispatch) => {
    if (img) {
      try {
        dispatch(messageStart());

        const storageRef = ref(
          storage,
          `images/chat/${crypto.randomUUID() + img?.name}`
        );
        const metadata = {
          contentType: img?.type,
        };
        const uploadTask = uploadBytesResumable(storageRef, img, metadata);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            dispatch(messageSendFail(error.message));
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", currentGroup[0]), {
                  message: arrayUnion({
                    id: crypto.randomUUID(),
                    message: message || null,
                    photoURL: downloadURL,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                  }),
                });
                // Updatet the current user lastmessage
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                  [currentGroup[0] + ".lastMessage"]: "Image",
                  [currentGroup[0] + ".date"]: serverTimestamp(),
                });
                // Updatet the reciver lastmessage
                await updateDoc(
                  doc(db, "userChats", currentGroup[1].receiverInfo.uid),
                  {
                    [currentGroup[0] + ".lastMessage"]: "Image",
                    [currentGroup[0] + ".date"]: serverTimestamp(),
                  }
                );
                setImg(null);
                dispatch(messageSendSuccess());
              }
            );
          }
        );
      } catch (error) {
        dispatch(messageSendFail(error.message));
      }
    } else {
      try {
        dispatch(messageStart());
        // Update the chart arrary
        await updateDoc(doc(db, "chats", currentGroup[0]), {
          message: arrayUnion({
            id: crypto.randomUUID(),
            message,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        // Updatet the current user lastmessage
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [currentGroup[0] + ".lastMessage"]: message,
          [currentGroup[0] + ".date"]: serverTimestamp(),
        });
        // Updatet the reciver lastmessage
        await updateDoc(
          doc(db, "userChats", currentGroup[1].receiverInfo.uid),
          {
            [currentGroup[0] + ".lastMessage"]: message,
            [currentGroup[0] + ".date"]: serverTimestamp(),
          }
        );
        dispatch(messageSendSuccess());
      } catch (error) {
        dispatch(messageSendFail(error.message));
      }
    }
  };
