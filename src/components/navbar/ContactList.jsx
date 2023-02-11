import React from "react";
import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentGroup } from "../../redux/action/messageAction";

const ContactList = ({ contactList, onClose }) => {
  const dispatch = useDispatch();
  const { currentGroup } = useSelector((state) => state.MESSAGE);

  // Set current group
  const handleClick = () => {
    if (currentGroup?.[0] == contactList[0]) return;
    dispatch(setCurrentGroup(contactList));
    onClose();
  };

  // Extract ReciverInfo
  const { receiverInfo } = contactList[1];

  return (
    <Box as={"button"} w="full" onClick={handleClick}>
      {contactList && (
        <UserCard
          name={receiverInfo?.displayName}
          lastMessage={contactList[1]?.lastMessage}
          groupId={contactList[0]}
          photoURL={receiverInfo?.photo}
          date={contactList[1]?.date}
          isHover={true}
        />
      )}
      <Divider h="1px" bgColor={useColorModeValue("gray.300", "gray.700")} />
    </Box>
  );
};

export default ContactList;
