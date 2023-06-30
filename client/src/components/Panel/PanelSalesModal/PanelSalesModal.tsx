import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { toggleSaleRequest } from "../../../api/sale/sale";
import { IPanelValues, PanelContext } from "../../../context/PanelProvider";
import { wordBook } from "../../../helpers/wordBook";
import { IExtraMeal } from "../../../pages/Admin/ManageExtraMeals/ManageExtraMeals";
import PanelStatusItem from "../PanelStatus/PanelStatusItem";

interface PanelSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCancelled: boolean;
  item: {
    menuId?: string;
    title?: string;
    type?: string;
    extra?: IExtraMeal[];
    image?: string;
    price?: string;
    isForSale: boolean;
    reserveId?: string;
  };
}

const PanelSalesModal = ({
  isOpen,
  onClose,
  item,
  isCancelled,
}: PanelSalesModalProps) => {
  const { setPanelValues } = useContext(PanelContext);
  const handleToggleSaleMeal = async () => {
    toast.promise(() => toggleSaleRequest(item.reserveId), {
      success: {
        render: ({ data }: { data: IPanelValues }) => {
          setPanelValues(data);
          return "انتقال غذا به بخش فروش با موفقیت انجام شد";
        },
      },
      pending: {
        render: () => {
          return "برای انتقال غذای رزرو شده به قسمت فروش صبر کنید";
        },
      },
      error: {
        render: () => {
          return wordBook.messages.errors.serverInternalError.fa;
        },
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isCancelled ? "لغو فروش غذا" : "فروش غذا"}</ModalHeader>
        <ModalBody>
          {!isCancelled ? (
            <Alert size="xs" colorScheme="blue">
              * توجه کنید. تا زمانی که منوی رزرو شده شما برای فروش میباشد
              نمیتوانید از QRCODE آن استفاده کنید
              <br />* قیمت برای فروش دو برابر خواهد بود
              <br />* هر کاربر تنها میتواند یک غذای فروشی رو بخرد
            </Alert>
          ) : (
            <Alert size="xs" colorScheme="blue">
              * با لغو فروش این غذا شما مجدد میتوانید از این رزرو استفاده کنید
            </Alert>
          )}

          <PanelStatusItem {...item} />

          <Button
            colorScheme="blue"
            size="sm"
            mt="4"
            width="100%"
            onClick={handleToggleSaleMeal}
          >
            {isCancelled ? "لغو فروش" : "ادامه فروش"}
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" size="xs" mr={3} onClick={onClose}>
            برگشت
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PanelSalesModal;
