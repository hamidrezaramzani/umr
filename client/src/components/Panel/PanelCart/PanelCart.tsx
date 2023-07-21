import {
  VStack,
  Heading,
  Tag,
  Box,
  Text,
  HStack,
  Button,
  Badge,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";
import { addBalanceRequest } from "../../../api/students/students";
import { IPanelValues, PanelContext } from "../../../context/PanelProvider";
import * as moment from "jalali-moment";
const PanelCart = () => {
  const AVAILABLE_ACCOUNT_BALANCE_VALUES = [5000, 10000, 25000, 50000];
  const { setPanelValues, panelValues } = useContext(PanelContext);

  const currentDate = moment(new Date().toISOString())
    .locale("fa")
    .format("jYYYY/jMM/jDD");
  const pay = async (value: number) => {
    toast.promise(() => addBalanceRequest<IPanelValues>(value), {
      pending: {
        render() {
          return "لطفا صبر کنید";
        },
      },
      success: {
        render(data) {
          setPanelValues(data.data?.data as IPanelValues);
          return "شارژ حساب با موفقیت انجام شد";
        },
      },
      error: {
        render() {
          return "خطایی در شارژ حساب به وجود آمده است لطفا بعدا امتحان کنید";
        },
      },
    });
  };
  return (
    <VStack width="100%" bg="white" p="5" rounded="md" gap="5">
      <HStack width="100%">
        <HStack
          justify="space-between"
          alignItems="center"
          color="gray.600"
          width="100%"
        >
          <Text>کیف پول</Text>{" "}
          <Menu>
            <MenuButton
              as={Button}
              size="xs"
              colorScheme="linkedin"
              rightIcon={<HiOutlineChevronDown />}
            >
              افزایش اعتبار
            </MenuButton>
            <MenuList>
              {AVAILABLE_ACCOUNT_BALANCE_VALUES.map((value) => (
                <MenuItem onClick={() => pay(value)}>{value} تومان</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <VStack
        width="100%"
        className="cart"
        justify="space-between"
        height="180"
        rounded="lg"
        p="3"
      >
        <Box>
          <Badge colorScheme="linkedin" variant="solid">
            {currentDate}
          </Badge>
        </Box>
        <Box>
          <Heading color="#fff"></Heading>
        </Box>
        <Box>
          <Heading fontSize="30" color="#fff" dir="ltr">
            {panelValues.user?.studentNumber}
          </Heading>
        </Box>
        <Box alignItems="center" gap="10px" display="flex" flexDir="column">
          <Text color="linkedin.200">{panelValues.user?.fullName}</Text>
          <Tag colorScheme="blue">
            اعتبار: {panelValues.user?.balance || 0} تومان
          </Tag>
        </Box>
      </VStack>
    </VStack>
  );
};

export default PanelCart;
