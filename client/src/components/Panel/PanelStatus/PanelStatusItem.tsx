import {
  Tooltip,
  HStack,
  VStack,
  Heading,
  Button,
  Image,
  Badge,
  Box,
} from "@chakra-ui/react";
import { AiOutlineBarcode } from "react-icons/ai";
import { getImageAddress } from "../../../helpers/getImageAddress";
import { IExtraMeal } from "../../../pages/Admin/ManageExtraMeals/ManageExtraMeals";

interface PanelStatusItemProps {
  title?: string;
  type?: string;
  extra?: IExtraMeal[];
  image?: string;
}
const PanelStatusItem = ({
  title,
  type,
  extra,
  image,
}: PanelStatusItemProps) => {
  return (
    <Tooltip label={type} hasArrow placement="top-start">
      <HStack justify="center" alignItems="center" alignContent="center">
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
        {/* <Button variant="unstyled" size="sm">
          <AiOutlineBarcode fontSize="25px" color="#686868" />
        </Button> */}

        <Button variant="solid" colorScheme="blue" size="sm">
          رزرو
        </Button>
      </HStack>
    </Tooltip>
  );
};

export default PanelStatusItem;
