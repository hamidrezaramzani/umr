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
import { AiOutlineBarcode } from "react-icons/ai";
import { toast } from "react-toastify";
import { reserveMenuItemRequest } from "../../../api/reserve/reserve";
import { getImageAddress } from "../../../helpers/getImageAddress";
import { IExtraMeal } from "../../../pages/Admin/ManageExtraMeals/ManageExtraMeals";
import PanelQRCode from "../PanelQRCode/PanelQRCode";

interface PanelStatusItemProps {
  menuId?: string;
  title?: string;
  type?: string;
  extra?: IExtraMeal[];
  image?: string;
  isReserved?: boolean;
  userId?: string;
}
const PanelStatusItem = ({
  title,
  type,
  extra,
  image,
  menuId,
  isReserved,
  userId,
}: PanelStatusItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleReserveMenuItem = async () => {
    try {
      await reserveMenuItemRequest(menuId!);
    } catch (error) {
      toast.error("مشکلی در سمت سرور وجود دارد مجددا بعدا امتحان کنید");
    }
  };

  const handleToggleShowBarcode = () => {
    onOpen();
  };
  return (
    <Tooltip label={type} hasArrow placement="top-start">
      <HStack justify="center" alignItems="center" alignContent="center" mb="3">
        <PanelQRCode
          id={userId}
          userId={userId}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Image
          src={getImageAddress(image!)}
          width="20%"
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
          >
            رزرو
          </Button>
        )}
      </HStack>
    </Tooltip>
  );
};

export default PanelStatusItem;
