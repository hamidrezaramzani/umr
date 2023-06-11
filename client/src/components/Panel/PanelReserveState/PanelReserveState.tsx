import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FiEye, FiPlusCircle } from "react-icons/fi";
import * as moment from "jalali-moment";
import { HiChevronRight } from "react-icons/hi";
import { MdChevronRight } from "react-icons/md";
const PanelReserveState = () => {
  const renderTableBody = () => {
    const now = moment().locale("fa"); // create a moment object representing the current date and time
    const startOfWeek = now.clone().startOf("week"); // set the moment object to the start of the current week
    const endOfWeek = now.clone().endOf("week"); // set the moment object to the end of the current week

    // iterate over the days of the week and output their names and dates
    const days = [];
    for (
      let day = startOfWeek;
      day <= endOfWeek;
      day = day.clone().add(1, "day")
    ) {
      days.push(day.format("dddd, DD MMMM  YYYY"));
    }
    return (
      <Tbody>
        {days.map((day) => {
          return (
            <Tr>
              <Td fontSize="15">{day}</Td>
              <Td>
                <HStack fontSize="15" color="red.300">
                  <Text>رزرو نشده</Text>
                  <FiPlusCircle />
                </HStack>
              </Td>
              <Td>
                <HStack fontSize="15" color="blue.300">
                  <Text>رزرو شده</Text>
                  <FiEye />
                </HStack>
              </Td>
              <Td>
                <HStack fontSize="15" color="gray.500">
                  <Text>تعریف نشده</Text>
                </HStack>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    );
  };
  return (
    <TableContainer width="100%">
      <HStack justify="center">
        <Heading color="gray.700" fontSize="20" width="100%">
          وضعیت رزرو این هفته
        </Heading>
        <Button size="xs" colorScheme="blue">
          هفته بعدی
          <MdChevronRight />
        </Button>
        <Button colorScheme="blue" size="xs">
          هفته قبلی
          <MdChevronRight />
        </Button>
      </HStack>
      <Text mt="2" fontSize="14" color="gray.500">
        اینجا شما میتوانید وضعیت رزرو این هفته رو ببینید و همچنین برای این هفته
        رو رزرو کنید
      </Text>
      <Table size="md" textAlign="center" colorScheme="blue">
        <Thead>
          <Tr>
            <Th>تاریخ</Th>
            <Th>صبحانه</Th>
            <Th>ناهار</Th>
            <Th>شام</Th>
          </Tr>
        </Thead>
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default PanelReserveState;
