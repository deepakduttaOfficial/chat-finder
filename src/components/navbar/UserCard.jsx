import React from "react";
// Chakra ui
import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux";

// import my npm package date time formatter
import datetimeFormatter from "datetime-formatter-js";

const UserCard = ({
  name,
  email,
  lastMessage,
  groupId,
  photoURL,
  isHover,
  date,
  ...rest
}) => {
  const hoverColorItem = useColorModeValue("whiteAlpha.800", "gray.800");
  const textColor = useColorModeValue("gray.500", "whiteAlpha.600");

  // Get current group
  const { currentGroup } = useSelector((state) => state.MESSAGE);

  return (
    <HStack
      align="center"
      p="4"
      bgColor={currentGroup && groupId === currentGroup[0] && hoverColorItem}
      borderRadius="lg"
      role="group"
      _hover={{
        bg: isHover && hoverColorItem,
      }}
      zIndex={"overlay"}
      {...rest}
    >
      <Avatar size="md" name={name} src={photoURL} />
      <VStack alignItems={"flex-start"} spacing="0" w="full">
        <HStack justifyContent="space-between" w="full">
          <Text
            fontWeight="medium"
            fontSize={{ base: email && "sm", md: email && "md" }}
          >
            {name}
          </Text>
          {lastMessage && (
            <Text
              color={useColorModeValue("gray.500", "#ffffff99")}
              fontSize="xs"
            >
              {datetimeFormatter.getTimeAgo(
                new Date(date?.seconds * 1000),
                true
              )}{" "}
              ago
            </Text>
          )}
        </HStack>
        <Box textAlign={"start"}>
          {lastMessage && (
            <Text color={textColor} noOfLines={1}>
              {lastMessage}
            </Text>
          )}
          {email && (
            <Text
              color={textColor}
              fontSize={{ base: email && "xs", md: email && "md" }}
            >
              {email}
            </Text>
          )}
        </Box>
      </VStack>
    </HStack>
  );
};
export default UserCard;
