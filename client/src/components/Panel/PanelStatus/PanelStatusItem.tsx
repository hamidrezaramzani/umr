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

interface PanelStatusItemProps {
  menuId?: string;
  title?: string;
  mealTimeId?: string;
  type?: string;
  extra?: IExtraMeal[];
  image?: string;
  isReserved?: boolean;
}
const PanelStatusItem = ({
  title,
  type,
  extra,
  image,
  menuId,
  isReserved,
  mealTimeId,
}: PanelStatusItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);
  const [isDisable, setisDisable] = useState<boolean>(false);
  const { setReserve } = useContext(PanelContext);
  const handleReserveMenuItem = async () => {
    toast.promise(() => reserveMenuItemRequest(menuId!, mealTimeId!), {
      pending: {
        render() {
          setisDisable(true);
          return "در حال ثبت رزرو غذا";
        },
      },
      success: {
        render({ data: { data } }: { data: { data: IPanelValues } }) {
          setisDisable(false);
          setReserve(data);
          return "رزرو غذا با موفقیت انجام شد";
        },
      },
      error: {
        render() {
          setisDisable(false);
          return "خطایی در ثبت رزرو غذا رخ داده است. لطفا مجدد امتحان کنید";
        },
      },
    });
  };

  const handleToggleShowBarcode = () => {
    onOpen();
  };
  return (
    <Tooltip label={type} hasArrow placement="top-start">
      <HStack
        justify="space-between"
        alignContent="space-between"
        width="100%"
        mb="3"
      >
        <PanelQRCode
          id={menuId}
          userId={user?.user?.id}
          isOpen={isOpen}
          onClose={onClose}
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
          <Heading fontSize="15" textAlign="right" color="gray.600">
            {title}
          </Heading>
          <HStack width="100%" justify="start">
            {extra?.map((item) => (
              <Badge size="xs" colorScheme="blue">
                {item.title}
              </Badge>
            ))}
          </HStack>
        </VStack>

        {isReserved ? (
          <Button
            variant="unstyled"
            size="sm"
            onClick={handleToggleShowBarcode}
          >
            <AiOutlineBarcode fontSize="25px" color="#686868" />
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={handleReserveMenuItem}
            disabled={isDisable}
          >
            رزرو
          </Button>
        )}
      </HStack>
    </Tooltip>
  );
};

export default PanelStatusItem;
