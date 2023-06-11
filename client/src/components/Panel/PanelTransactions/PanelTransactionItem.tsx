import { HStack, VStack, Heading, Badge, Text } from "@chakra-ui/react";
import {
  MdOutlineAddShoppingCart,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
interface PanelTransactionItemProps {
  type: string;
  date: string;
  value: number;
  title: string;
}
const PanelTransactionItem = ({
  type,
  date,
  value,
  title,
}: PanelTransactionItemProps) => {
  return (
    <HStack width="100%" justify="space-between">
      <HStack align="start">
        {type === "add" ? (
          <MdOutlineAddShoppingCart fontSize="30" color="#222" />
        ) : (
          <MdOutlineShoppingCartCheckout fontSize="30" color="#222" />
        )}
        <VStack align="start">
          <Heading fontSize="15" color="#333">
            {title}
          </Heading>
          <Text
            color="gray.400"
            textAlign="right"
            fontSize="14"
            fontWeight="normal"
          >
            {date}
          </Text>
        </VStack>
      </HStack>
      <Badge colorScheme={type === "add" ? "green" : "orange"}>
        {value} تومان
      </Badge>
    </HStack>
  );
};

export default PanelTransactionItem;
