import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { IMenuItem } from "../../../../pages/Panel/PanelPage";
import PanelStatusItem from "../../PanelStatus/PanelStatusItem";
interface PanelReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMenuItems: IMenuItem[];
}
const PanelReserveModal = ({
  isOpen,
  onClose,
  selectedMenuItems,
}: PanelReserveModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>رزرو غذا</ModalHeader>
        <ModalBody>
          {selectedMenuItems.map((menu) => (
            <PanelStatusItem
              key={menu._id}
              title={menu.meal?.name}
              extra={menu.extraMeals}
              image={menu.meal?.image}
              type={menu.mealTimes?.title}
            />
          ))}
        </ModalBody>

        <ModalFooter>
          <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
            خروج
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PanelReserveModal;
