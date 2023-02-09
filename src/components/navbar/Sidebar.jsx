import React, { useEffect } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Image,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom style
import { sidebarBrandContainer, sidebarContainerStyle } from "./style";

import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

// Contact list container
import ContactList from "./ContactList";
// Contact list actions
import {
  getContactLoading,
  setContactList,
  successAddContact,
} from "../../redux/action/contactAction";

// Not contact found
import not_found from "../../assets/not_found.svg";
import FindStranger from "./FindStranger";

const Sidebar = ({ onClose, ...rest }) => {
  // Colors theme
  const SidebarBgColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.800");
  // dispatch
  const dispatch = useDispatch();
  // Get all the state
  const { contactList, loading } = useSelector((state) => state.CONTACT_LIST);
  const { currentUser } = useSelector((state) => state.AUTH);

  // Fetching user all Contact list
  useEffect(() => {
    dispatch(getContactLoading());
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userCharts", currentUser.uid),
        (doc) => {
          // set it to the global state
          dispatch(setContactList(doc.data()));
          dispatch(successAddContact());
        }
      );
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const isEmptyContactList = Object.entries(contactList).length === 0;

  return (
    <Box
      bg={SidebarBgColor}
      borderRightColor={borderColor}
      {...sidebarContainerStyle}
      {...rest}
    >
      <Flex {...sidebarBrandContainer} borderBottomColor={borderColor}>
        <FindStranger />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          border="1px"
          borderColor={"gray.300"}
        />
      </Flex>
      <Box overflow={"scroll"} h="full">
        {loading && <Progress size="xs" isIndeterminate />}
        {isEmptyContactList && <Image src={not_found} mt="5" p="5" />}
        {contactList &&
          Object.entries(contactList)?.map((contact) => (
            <ContactList
              contactList={contact}
              key={contact[0]}
              onClose={onClose}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
