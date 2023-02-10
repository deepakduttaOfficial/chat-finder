import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
//  Custom style
import { containerStyle, textContainerStyle, timeStyle } from "./style";
// import my npm package date time formatter
import datetimeFormatter from "datetime-formatter-js";

const MessageCard = ({ mess, currentUser }) => {
  // console.log(new Date().toDateString());

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
          {datetimeFormatter.formatAMPM(new Date(mess.date.seconds * 1000))}
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageCard;
