import React, { useEffect } from "react";
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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

const Wrapper = ({ children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // dispatch
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AUTH);
  // Fetching user all Contact list
  useEffect(() => {
    dispatch(getContactLoading());
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // set it to the global state
        dispatch(setContactList(doc.data()));
        dispatch(successAddContact());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

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
