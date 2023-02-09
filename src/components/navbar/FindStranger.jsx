import React, { useEffect, useState } from "react";
// Chakra ui
import {
  chakra,
  Box,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useColorModeValue,
  Image,
  ModalBody,
  SkeletonCircle,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";

// User card [imgaes, email and name]
import UserCard from "./UserCard";

// Redux and action
import { useDispatch, useSelector } from "react-redux";
import { findUser, selectUser } from "../../redux/action/contactAction";

// import not found image
import not_found from "../../assets/not_found.svg";
import search from "../../assets/search.svg";

// Icons
import { IoMdAdd } from "react-icons/io";

const FindStranger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  // Get state
  const { currentUser } = useSelector((state) => state.AUTH);
  const CONTACT_LIST = useSelector((state) => state.CONTACT_LIST);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({
    receiverInfo: null,
    error: null,
    loading: false,
  });
  const { receiverInfo, error, loading } = user;

  // Find the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.email === email) return;
    dispatch(findUser({ email, setUser, user }));
  };

  // Add to the contact
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > receiverInfo.uid
        ? currentUser.uid + receiverInfo.uid
        : receiverInfo.uid + currentUser.uid;
    dispatch(selectUser({ combinedId, currentUser, receiverInfo }));
    setUser({ error: null, receiverInfo: null, loading: false });
  };

  // Check any error or not
  useEffect(() => {
    if (CONTACT_LIST.error) {
      toast({
        title: CONTACT_LIST.error,
        status: "error",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
    if (CONTACT_LIST.success) {
      toast({
        title: CONTACT_LIST.success.title,
        description: CONTACT_LIST.success.desc,
        status: "success",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
    }
  }, [CONTACT_LIST.error, CONTACT_LIST.success]);

  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          setUser({ error: null, receiverInfo: null, loading: false });
        }}
        leftIcon={<IoMdAdd />}
        colorScheme="blue"
      >
        Find Stranger
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <chakra.form onSubmit={handleSubmit}>
              <Input
                type="search"
                border="none"
                _focus={{ ring: "0", border: "none" }}
                placeholder={"Search By email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </chakra.form>
            <Box
              borderTop={"1px"}
              borderTopColor={useColorModeValue("gray.300", "gray.500")}
            >
              {loading && (
                <Box w="full">
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="1"
                    noOfLines={1}
                    spacing="4"
                    skeletonHeight="5"
                    startColor="gray.300"
                    endColor="gray.500"
                  />
                </Box>
              )}
              {receiverInfo && (
                <UserCard
                  name={receiverInfo?.displayName}
                  email={receiverInfo?.email}
                  photoURL={receiverInfo?.photo}
                  onClick={() => {
                    handleSelect();
                    onClose();
                  }}
                  cursor="pointer"
                />
              )}
              {error && <Image src={not_found} w="full" p="5" />}
              {!loading && !error && <Image src={search} w="full" p="5" />}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FindStranger;
