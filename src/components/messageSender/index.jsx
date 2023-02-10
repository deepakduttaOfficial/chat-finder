import React, { useEffect, useState } from "react";
import {
  chakra,
  Input,
  FormControl,
  IconButton,
  HStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/action/messageAction";
// Icon
import { IoMdSend } from "react-icons/io";

const MessageSender = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentGroup, error, success, loading } = useSelector(
    (state) => state.MESSAGE
  );
  const { currentUser } = useSelector((state) => state.AUTH);
  //  Animation state

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendMessage({ currentGroup, currentUser, message }));
    setMessage("");
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 9000,
      });
    }
  }, [error]);

  const validate = !currentGroup || message.length === 0;

  return (
    <chakra.form
      bottom={0}
      w="full"
      pos="fixed"
      pl={{ base: 0, md: "72" }}
      onSubmit={handleSubmit}
    >
      <HStack py="8" px="5" bgColor={bgColor} w="full">
        <FormControl>
          <Input
            borderColor={useColorModeValue("gray.400", "whiteAlpha.500")}
            _focus={{
              borderColor: useColorModeValue("gray.400", "whiteAlpha.500"),
              ring: "none",
            }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </FormControl>
        <IconButton
          icon={<IoMdSend />}
          borderColor={useColorModeValue("gray.400", "gray.200")}
          variant={"outline"}
          type="submit"
          isLoading={loading}
          isDisabled={validate}
        >
          send
        </IconButton>
      </HStack>
    </chakra.form>
  );
};

export default MessageSender;
