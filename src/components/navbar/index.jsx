import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import TopbarContainer from "./TopbarContainer.jsx";
import MessageSender from "../messageSender";
// Contact list actions
import {
  getContactLoading,
  setContactList,
  successAddContact,
} from "../../redux/action/contactAction";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const Wrapper = ({ children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //
  const [contact, setContact] = useState();

  // dispatch
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  // Fetching user all Contact list
  useEffect(() => {
    dispatch(getContactLoading());
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setContact(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  useEffect(() => {
    const unsub = async () => {
      let obj = {};
      for (const key in contact) {
        const docSnap = await getDoc(
          doc(db, "users", contact[key].receiverInfo.uid)
        );
        obj = {
          ...obj,
          [key]: {
            date: contact[key].date,
            lastMessage: contact[key]?.lastMessage,
            receiverInfo: docSnap.data(),
          },
        };
      }
      dispatch(setContactList(obj));
      dispatch(successAddContact());
    };
    contact && unsub();
    return () => {
      unsub();
    };
  }, [contact]);

  return (
    <Box minH="100vh" bgColor={useColorModeValue("white", "blackAlpha.300")}>
      <Sidebar onClose={onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Top bar */}
      <TopbarContainer onOpen={onOpen} pos="sticky" top="0" />
      {/* All message goes here */}
      <Box ml={{ base: 0, md: "72" }} {...rest}>
        {children}
      </Box>
      {/* Message sender input */}
      <MessageSender />
    </Box>
  );
};

export default Wrapper;
