import React from "react";
import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { setCurrentGroup } from "../../redux/action/messageAction";

const ContactList = ({ contactList, onClose }) => {
  const dispatch = useDispatch();

  // Set current group
  const handleClick = () => {
    dispatch(setCurrentGroup(contactList));
    onClose();
  };

  // Extract ReciverInfo
  const { receiverInfo } = contactList[1];

  return (
    <Box as={"button"} w="full" onClick={handleClick}>
      {contactList && (
        <UserCard
          name={receiverInfo.displayName}
          email={receiverInfo.email}
          groupId={contactList[0]}
          photoURL={receiverInfo.photoURL}
          isHover={true}
        />
      )}
      <Divider h="1px" bgColor={useColorModeValue("gray.300", "gray.200")} />
    </Box>
  );
};

export default ContactList;
