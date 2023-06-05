import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "delete" | "info";
  title: string;
  description: string;
}
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  title,
  description,
}: ConfirmModalProps) => {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              خیر
            </Button>
            <Button
              colorScheme={type === "delete" ? "red" : "blue"}
              onClick={onConfirm}
              ml={3}
            >
              بله
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmModal;
