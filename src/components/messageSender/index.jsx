import React from "react";
import {
  chakra,
  Input,
  FormControl,
  IconButton,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const MessageSender = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");

  return (
    <chakra.form bottom={0} w="full" pos="fixed" pl={{ base: 0, md: "72" }}>
      <HStack py="8" px="5" bgColor={bgColor} w="full">
        <FormControl>
          <Input borderColor={useColorModeValue("gray.400", "gray.200")} />
        </FormControl>
        <Button
          borderColor={useColorModeValue("gray.400", "gray.200")}
          variant={"outline"}
        >
          send
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default MessageSender;
