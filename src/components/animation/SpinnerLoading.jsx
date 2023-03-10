import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

const SpinnerLoading = ({ loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (loading) {
      onOpen();
    } else {
      onClose();
    }
  }, [loading]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalContent bgColor="transparent" shadow="none" onClick={onClose}>
          <ModalOverlay />
          <Spinner size="xl" mx="auto" />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SpinnerLoading;
