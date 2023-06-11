import {
  Tooltip,
  HStack,
  VStack,
  Heading,
  Button,
  Image,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineBarcode } from "react-icons/ai";

interface PanelStatusItemProps {
  title: string;
  type: string;
  extra: string[];
  image: string;
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
        <Image src={image} width="20%" rounded="md" />
        <VStack width="70%" alignItems="start" gap="3">
          <Heading fontSize="15" textAlign="right" color="gray.600">
            {title}
          </Heading>
          <HStack width="100%" justify="start">
            {extra.map((item) => (
              <Badge size="xs" colorScheme="blue">
                {item}
              </Badge>
            ))}
          </HStack>
        </VStack>
        <Button variant="unstyled" size="sm">
          <AiOutlineBarcode fontSize="25px" color="#686868" />
        </Button>
      </HStack>
    </Tooltip>
  );
};

export default PanelStatusItem;
