import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { containerStyle, textContainerStyle, timeStyle } from "./style";

const MessageCard = ({ mess, currentUser }) => {
  return (
    <Flex
      justifyContent={mess.senderId === currentUser.uid && "flex-end"}
      {...containerStyle}
    >
      <Box
        bgColor={useColorModeValue(
          mess.senderId === currentUser.uid ? "green.100" : "gray.300",
          mess.senderId === currentUser.uid ? "#005c4b" : "#202c33"
        )}
        {...textContainerStyle}
      >
        <Text mr="12" color={useColorModeValue("gray.700", "white")}>
          {mess.message}
        </Text>
        <Text
          aria-level="time"
          color={useColorModeValue("gray.500", "#ffffff99")}
          {...timeStyle}
        >
          2:21 am
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageCard;
