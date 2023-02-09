import React from "react";
// Chakra ui
import {
  Avatar,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux";

const UserCard = ({ name, email, groupId, photoURL, isHover, ...rest }) => {
  const hoverColorItem = useColorModeValue("whiteAlpha.800", "gray.800");

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
      <VStack alignItems="start" spacing="0">
        <Text color={useColorModeValue("gray.500", "whiteAlpha.600")}>
          {name}
        </Text>
        <Text>{email}</Text>
      </VStack>
    </HStack>
  );
};
export default UserCard;
