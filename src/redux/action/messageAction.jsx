import { MessageAction } from "../actionTypes/MessageAction";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

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
  ({ currentGroup, currentUser, message }) =>
  async (dispatch) => {
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
      await updateDoc(doc(db, "userCharts", currentUser.uid), {
        [currentGroup[0] + ".lastMessage"]: message,
        [currentGroup[0] + ".date"]: serverTimestamp(),
      });
      // Updatet the reciver lastmessage
      await updateDoc(doc(db, "userCharts", currentGroup[1].receiverInfo.uid), {
        [currentGroup[0] + ".lastMessage"]: message,
        [currentGroup[0] + ".date"]: serverTimestamp(),
      });
      dispatch(messageSendSuccess());
    } catch (error) {
      dispatch(messageSendFail(error));
    }
  };
