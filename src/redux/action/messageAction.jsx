import { MessageAction } from "../actionTypes/MessageAction";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
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
      await updateDoc(doc(db, "chats", currentGroup && currentGroup[0]), {
        message: arrayUnion({
          id: crypto.randomUUID(),
          message,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      dispatch(messageSendSuccess());
    } catch (error) {
      dispatch(messageSendFail(error));
    }
  };
