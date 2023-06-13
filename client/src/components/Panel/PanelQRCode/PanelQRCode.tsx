import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";

interface PanelQRCodeProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
  userId?: string;
}
const PanelQRCode = ({ isOpen, onClose, id, userId }: PanelQRCodeProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>کیو آرکد</ModalHeader>
        <ModalBody>
          <VStack justify="center">
            <QRCode value={`${userId}${id}`} />
            <Text>
              {userId}
              {id}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button colorScheme="red" size="sm" mr={3} onClick={onClose}>
            برگشت
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PanelQRCode;
