import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import ProfileAction from "../actionTypes/ProfileType";

// Image upload animations
const imageUploadStart = () => ({ type: ProfileAction.IMAGE_UPLOAD_START });
const imageUploadSuccess = (payload) => ({
  type: ProfileAction.IMAGE_UPLOAD_SUCCESS,
  payload,
});
const imageUploadFail = (payload) => ({
  type: ProfileAction.IMAGE_UPLOAD_FAIL,
  payload,
});

// Update the image
export const uploadImage = (file, currentUser) => async (dispatch) => {
  try {
    dispatch(imageUploadStart());
    // First delete the previous image
    if (currentUser.photoURL) {
      const deleteRef = ref(storage, currentUser.photoURL);
      getDownloadURL(deleteRef)
        .then(async () => {
          await deleteObject(deleteRef);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // Upload image
    const storageRef = ref(
      storage,
      `images/user/${crypto.randomUUID() + file?.name}`
    );
    const metadata = {
      contentType: file?.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        dispatch(imageUploadFail(error.message));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          });
          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            photo: downloadURL,
          });
          dispatch(imageUploadSuccess("Image updated successfully"));
        });
      }
    );
  } catch (error) {
    dispatch(imageUploadFail(error.message));
  }
};

// Update field [name]
const fieldUpdateStart = () => ({ type: ProfileAction.FIELD_UPDATE_START });
const fieldUpdateSuccess = (payload) => ({
  type: ProfileAction.FIELD_UPDATE_SUCCESS,
  payload,
});
const fieldUpdateFail = (payload) => ({
  type: ProfileAction.FIELD_UPDATE_FAIL,
  payload,
});
export const updateField = (name) => async (dispatch) => {
  try {
    dispatch(fieldUpdateStart());
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: name,
    });
    dispatch(fieldUpdateSuccess("Name updated successfully"));
  } catch (error) {
    console.log(error);
    dispatch(fieldUpdateFail(error.message));
  }
};
