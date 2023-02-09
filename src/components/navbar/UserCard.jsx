import React from "react";
// Chakra ui
import {
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux";

const UserCard = ({ name, email, groupId, photoURL, isHover, ...rest }) => {
  const hoverColorItem = useColorModeValue("whiteAlpha.500", "black");

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
      <Image
        src={photoURL || "https://bit.ly/dan-abramov"}
        w="10"
        rounded={"full"}
      />
      <VStack alignItems="start" spacing="0">
        <Text color={useColorModeValue("gray.500", "gray.600")}>{name}</Text>
        <Text>{email}</Text>
      </VStack>
    </HStack>
  );
};
export default UserCard;
