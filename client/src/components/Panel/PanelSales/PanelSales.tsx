import {
  Badge,
  Button,
  Heading,
  HStack,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { buySaleMenuRequest } from "../../../api/sale/sale";
import {
  IPanelValues,
  ISale,
  PanelContext,
} from "../../../context/PanelProvider";
import { wordBook } from "../../../helpers/wordBook";

interface PanelSalesProps {
  sales?: ISale[];
}
const PanelSales = ({ sales }: PanelSalesProps) => {
  const { setPanelValues } = useContext(PanelContext);
  const handleBuyASaleMenuItem = (saleId: string) => {
    toast.promise(() => buySaleMenuRequest(saleId), {
      pending: {
        render: () => {
          return "برای ثبت درخواست خرید این غذا صبر کنید";
        },
      },
      error: {
        render: ({ data: err }: { data: AxiosError }) => {
          if (err.response?.status === 400) {
            return (err.response.data as AxiosError).message;
          }

          return wordBook.messages.errors.serverInternalError.fa;
        },
      },
      success: {
        render: ({ data: { data } }: { data: { data: IPanelValues } }) => {
          setPanelValues(data);
          return "رزرو غذا با موفقیت انجام شد";
        },
      },
    });
  };
  const renderTodaySales = () => {
    return sales?.length ? (
      sales?.map((sale) => (
        <Tr>
          <Td>{sale.user.fullName}</Td>
          <Td>{sale.menu.meal?.name}</Td>
          <Td>
            <HStack gap="3">
              {sale.menu.extraMeals?.map((extraMeal) => (
                <Badge key={extraMeal._id} colorScheme="blue">
                  {extraMeal.title}
                </Badge>
              ))}
            </HStack>
          </Td>
          <Td>{Number(sale.menu.meal?.price) * 2} تومان</Td>
          <Td>
            <Button
              type="button"
              size="xs"
              colorScheme="blue"
              onClick={() => handleBuyASaleMenuItem(sale._id)}
            >
              خرید
            </Button>
          </Td>
        </Tr>
      ))
    ) : (
      <Tr>
        <Td colSpan={6} fontSize="13" color="gray.500">
          امروز غذایی برای فروش گذاشته نشده است
        </Td>
      </Tr>
    );
  };
  return (
    <VStack width="100%" p="5" bg="white" height="auto" rounded="md">
      <TableContainer width="100%">
        <VStack align="start">
          <Heading color="gray.700" fontSize="20" width="100%">
            لیست فروش امروز
          </Heading>
          <Text mt="2" fontSize="14" color="gray.500">
            اگر مهلت رزرو غذا تمام شد شما میتوانید اینجا غذاهایی که در روز سرو
            فروش میروند را بخرید
          </Text>
        </VStack>
        <Table size="md" textAlign="center" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>فروشنده</Th>
              <Th>غذا</Th>
              <Th>اضافه ها</Th>
              <Th>قیمت</Th>
              <Th>خرید</Th>
            </Tr>
          </Thead>
          {renderTodaySales()}
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default PanelSales;
