import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import { IUser } from "../../../pages/Panel/PanelPage";
import PanelTransactionItem from "./PanelTransactionItem";
import * as moment from "jalali-moment";

export interface ITransaction {
  _id: string;
  type: "add" | "move";
  value: number;
  user: IUser;
  date: moment.Moment;
}

interface PanelTransactionProps {
  transactions?: ITransaction[];
}
const PanelTransactions = ({ transactions }: PanelTransactionProps) => {
  const renderTransactions = () => {
    return transactions?.map((transaction) => (
      <PanelTransactionItem {...transaction} />
    ));
  };
  return (
    <VStack width="100%" bg="white" p="5" rounded="md" gap="5">
      <HStack
        justify="space-between"
        alignItems="center"
        color="gray.600"
        width="100%"
      >
        <Text>تاریخچه تراکنش</Text>{" "}
        <Button size="xs" colorScheme="blue">
          بیشتر
        </Button>
      </HStack>
      <VStack gap="8" width="100%">
        {renderTransactions()}
      </VStack>
    </VStack>
  );
};

export default PanelTransactions;
