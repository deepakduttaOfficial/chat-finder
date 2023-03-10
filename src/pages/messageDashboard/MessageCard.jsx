import React from "react";
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
//  Custom style
import { containerStyle, textContainerStyle, timeStyle } from "./style";
// import my npm package date time formatter
import datetimeFormatter from "datetime-formatter-js";

const MessageCard = ({ mess, currentUser }) => {
  // console.log(new Date().toDateString());
  const isURL = (string) => {
    var res = string?.match(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    );
    return res !== null;
  };

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
        p={"2"}
        pb={!mess.message && "6"}
        {...textContainerStyle}
      >
        {mess?.photoURL && <Image src={mess.photoURL} w="52" />}
        {isURL(mess.message) ? (
          <Link
            color={"blue.400"}
            fontSize="sm"
            href={mess.message}
            target="_blank"
            mr="12"
          >
            {mess.message}
          </Link>
        ) : (
          <Text mr="12" color={useColorModeValue("gray.700", "white")}>
            {mess.message}
          </Text>
        )}

        <Text
          aria-level="time"
          color={useColorModeValue("gray.500", "#ffffff99")}
          fontSize="xs"
          mt="-2"
          pos="absolute"
          right="0"
          bottom="1"
          pr="1"
          // {...timeStyle}
        >
          {datetimeFormatter.formatAMPM(new Date(mess.date.seconds * 1000))}
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageCard;
