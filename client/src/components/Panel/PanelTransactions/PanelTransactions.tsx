import { Button, HStack, VStack, Text } from "@chakra-ui/react";
import PanelTransactionItem from "./PanelTransactionItem";

const PanelTransactions = () => {
  const transactions = [
    {
      title: "افزایش موجودی",
      date: "۲۱ خرداد ۱۴۰۲ − ۲۰:۱۸",
      value: 20000,
      type: "add",
    },

    {
      title: "انتقال موجودی",
      date: "۲۱ خرداد ۱۴۰۲ − ۲۰:۱۸",
      value: 145000,
      type: "move",
    },
    {
      title: "انتقال موجودی",
      date: "۲۱ خرداد ۱۴۰۲ − ۲۰:۱۸",
      value: 50000,
      type: "move",
    },
    {
      title: "افزایش موجودی",
      date: "۲۱ خرداد ۱۴۰۲ − ۲۰:۱۸",
      value: 40000,
      type: "add",
    },
    {
      title: "انتقال موجودی",
      date: "۲۱ خرداد ۱۴۰۲ − ۲۰:۱۸",
      value: 65000,
      type: "move",
    },
  ];

  const renderTransactions = () => {
    return transactions.map((transaction) => (
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
