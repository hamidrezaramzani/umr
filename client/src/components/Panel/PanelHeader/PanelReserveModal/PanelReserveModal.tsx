import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { IMenuItem } from "../../../../pages/Panel/PanelPage";
import PanelStatusItem from "../../PanelStatus/PanelStatusItem";
interface PanelReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMenuItems?: IMenuItem[];
  userId?: string;
  isCurrentWeek?: false;
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
          {selectedMenuItems?.map((menu) => (
            <PanelStatusItem
              key={menu._id}
              menuId={menu._id}
              title={menu.meal?.name}
              extra={menu.extraMeals}
              image={menu.meal?.image}
              type={menu.mealTimes?.title}
              isReserved={menu.isReserved}
              mealTimeId={menu.mealTimes?._id}
              price={menu.meal?.price}
            />
          ))}
        </ModalBody>

        <ModalFooter>
          <Button size="sm" colorScheme="red" mr={3} onClick={onClose}>
            برگشت
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PanelReserveModal;
