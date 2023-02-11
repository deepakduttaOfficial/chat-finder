import React, { useEffect, useState } from "react";
import {
  chakra,
  Input,
  FormControl,
  IconButton,
  HStack,
  useColorModeValue,
  useToast,
  Box,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/action/messageAction";
// Icon
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

// Custom style
import {
  formStyle,
  iconContainerStyle,
  imageInputContainerStyle,
  imageInputStyle,
} from "./style";

const MessageSender = () => {
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentGroup, error, loading } = useSelector(
    (state) => state.MESSAGE
  );
  const { currentUser } = useSelector((state) => state.AUTH);
  //  Animation state

  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendMessage({ currentGroup, currentUser, message, img, setImg }));
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

  const validate = !currentGroup || (message.length === 0 && !img);

  return (
    <chakra.form {...formStyle} onSubmit={handleSubmit}>
      <HStack py="8" px="5" bgColor={bgColor} w="full">
        <FormControl>
          <Input
            type={"text"}
            borderColor={useColorModeValue("gray.400", "whiteAlpha.500")}
            _focus={{
              borderColor: useColorModeValue("gray.400", "whiteAlpha.500"),
              ring: "none",
            }}
            placeholder="Write your message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </FormControl>
        {/* Image preview */}
        {img && (
          <Box w="16" h="10" pos="relative">
            <Image h="full" w="full" src={URL.createObjectURL(img)} />
            <Stack
              pos="absolute"
              top="-2"
              right="-2"
              bgColor="red.800"
              rounded="full"
              cursor="pointer"
              onClick={() => setImg(null)}
            >
              <TiDelete size="20" />
            </Stack>
          </Box>
        )}

        {/* Image upload field */}
        <Box {...imageInputContainerStyle}>
          <Box {...iconContainerStyle}>
            <AiOutlineLink size={"24"} />
          </Box>

          <Input
            {...imageInputStyle}
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </Box>
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
