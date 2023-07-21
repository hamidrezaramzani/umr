/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Tooltip,
  HStack,
  VStack,
  Heading,
  Button,
  Image,
  Badge,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiOutlineBarcode } from "react-icons/ai";
import { toast } from "react-toastify";
import { reserveMenuItemRequest } from "../../../api/reserve/reserve";
import { IPanelValues, PanelContext } from "../../../context/PanelProvider";
import { UserContext } from "../../../context/UserProvider";
import { getImageAddress } from "../../../helpers/getImageAddress";
import { IExtraMeal } from "../../../pages/Admin/ManageExtraMeals/ManageExtraMeals";
import PanelQRCode from "../PanelQRCode/PanelQRCode";
import * as moment from "jalali-moment";
import { wordBook } from "../../../helpers/wordBook";
import { TbShoppingCartOff, TbShoppingCartPlus } from "react-icons/tb";
import PanelSalesModal from "../PanelSalesModal/PanelSalesModal";
interface PanelStatusItemProps {
  menuId?: string;
  title?: string;
  mealTimeId?: string;
  type?: string;
  extra?: IExtraMeal[];
  image?: string;
  price?: string;
  isReserved?: boolean;
  isTodayReserve?: boolean;
  reservationDateRange?: string[];
  isForSale?: boolean;
  reserveId?: string;
}
const PanelStatusItem = ({
  title,
  type,
  extra,
  image,
  menuId,
  isReserved,
  mealTimeId,
  price,
  reservationDateRange,
  isForSale,
  reserveId,
}: PanelStatusItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSalesModal,
    onOpen: onOpenSalesModal,
    onClose: onCloseSalesModal,
  } = useDisclosure();
  const { user } = useContext(UserContext);
  const [isDisable, setisDisable] = useState<boolean>(false);
  const [isCancelled, setCancelled] = useState<boolean>(false);
  const { setPanelValues } = useContext(PanelContext);
  const handleReserveMenuItem = async () => {
    toast.promise(
      () => reserveMenuItemRequest<IPanelValues>(menuId!, mealTimeId!),
      {
        pending: {
          render() {
            setisDisable(true);
            return "در حال ثبت رزرو غذا";
          },
        },
        success: {
          render(data) {
            setisDisable(false);
            setPanelValues(data.data?.data as IPanelValues);
            return "رزرو غذا با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }: any) {
            setisDisable(false);
            if (data.response.status === 422) {
              return "موجودی کافی نمی باشد";
            }
            return wordBook.messages.errors.serverInternalError.fa;
          },
        },
      },
    );
  };

  const handleToggleShowBarcode = () => {
    onOpen();
  };

  const checkIfTodayIsBetweenReservationDateRange = () => {
    const startDate = moment(reservationDateRange![0], "jYYYY/jMM/jDD");
    const endDate = moment(reservationDateRange![1], "jYYYY/jMM/jDD");
    const dateToCheck = moment(
      moment().locale("fa").format("jYYYY/jMM/jDD"),
      "jYYYY/jMM/jDD",
    );
    return dateToCheck.isBetween(startDate, endDate);
  };

  const handelToggleShowSalesModal = () => {
    onOpenSalesModal();
  };
  return (
    <Tooltip label={type} hasArrow placement="top-start">
      <HStack
        justify="space-between"
        alignContent="space-between"
        width="100%"
        my="3"
      >
        <PanelQRCode
          id={menuId}
          userId={user?.user?.id}
          isOpen={isOpen}
          onClose={onClose}
        />
        <PanelSalesModal
          isOpen={isOpenSalesModal}
          isCancelled={isCancelled}
          onClose={onCloseSalesModal}
          item={{
            reserveId,
            title,
            type,
            extra,
            image,
            price,
            isForSale: true,
          }}
        />
        <Image
          src={getImageAddress(image!)}
          width="80px"
          height="80px"
          fallback={
            <Box width="20%" height="80px" bg="gray.500" rounded="md"></Box>
          }
          objectFit="fill"
          rounded="md"
        />
        <VStack width="70%" alignItems="start" gap="3">
          <HStack width="100%" justify="start">
            {extra?.map((item) => (
              <Badge size="xs" colorScheme="blue">
                {item.title}
              </Badge>
            ))}
          </HStack>
          <HStack justify="start">
            <Heading fontSize="15" textAlign="right" color="gray.600">
              {title}
            </Heading>
          </HStack>

          <Badge colorScheme="green" fontSize="10">
            {isForSale ? Number(price!) * 2 : price} تومان &nbsp;
            <b>{isForSale ? "برای فروش" : ""}</b>
          </Badge>
        </VStack>

        {!isForSale && (
          <>
            {isReserved ? (
              <VStack>
                <Tooltip label="کیوآرکد">
                  <Button
                    variant="unstyled"
                    size="sm"
                    onClick={handleToggleShowBarcode}
                  >
                    <AiOutlineBarcode fontSize="25px" color="#686868" />
                  </Button>
                </Tooltip>
                <Tooltip label="فروش">
                  <Button
                    onClick={() => {
                      setCancelled(false);
                      handelToggleShowSalesModal();
                    }}
                    variant="unstyled"
                    size="sm"
                  >
                    <TbShoppingCartPlus fontSize="25px" color="#3182ce" />
                  </Button>
                </Tooltip>
              </VStack>
            ) : checkIfTodayIsBetweenReservationDateRange() ? (
              <Button
                variant="solid"
                colorScheme="blue"
                size="xs"
                onClick={handleReserveMenuItem}
                disabled={isDisable}
              >
                رزرو
              </Button>
            ) : (
              <Tooltip label="شما در بازه زمانی مجاز جهت رزرو نیستید">
                <Button
                  variant="solid"
                  colorScheme="red"
                  size="xs"
                  disabled={isDisable}
                >
                  غیر قابل رزرو
                </Button>
              </Tooltip>
            )}
          </>
        )}

        {isForSale && (
          <Tooltip label="لغو فروش">
            <Button
              onClick={() => {
                setCancelled(true);
                handelToggleShowSalesModal();
              }}
              variant="unstyled"
              size="sm"
            >
              <TbShoppingCartOff fontSize="25px" color="#3182ce" />
            </Button>
          </Tooltip>
        )}
      </HStack>
    </Tooltip>
  );
};

export default PanelStatusItem;
