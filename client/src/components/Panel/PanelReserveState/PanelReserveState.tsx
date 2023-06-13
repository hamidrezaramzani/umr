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
  useDisclosure,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import * as moment from "jalali-moment";
import { MdChevronRight } from "react-icons/md";
import { IMealTime } from "../../../pages/Admin/ManageMealTimes/ManageMealTimesForm";
import { IMenuItem, IReserve } from "../../../pages/Panel/PanelPage";
import PanelReserveModal from "../PanelHeader/PanelReserveModal/PanelReserveModal";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserProvider";
interface PanelReserverStateProps {
  mealTimes?: IMealTime[];
  menus?: IMenuItem[];
  reserveds?: IReserve[];
}
const PanelReserveState = ({
  mealTimes,
  menus,
  reserveds,
}: PanelReserverStateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenuItems, setSelectedMenuItems] = useState<IMenuItem[]>([]);
  const handleToggleReserveModal = (menus: IMenuItem[] | undefined) => {
    setSelectedMenuItems(menus!);
    onOpen();
  };
  const { user } = useContext(UserContext);
  const renderTableBody = () => {
    const now = moment().locale("fa");
    const startOfWeek = now.clone().startOf("week");
    const endOfWeek = now.clone().endOf("week");

    const days = [];
    for (
      let day = startOfWeek;
      day <= endOfWeek;
      day = day.clone().add(1, "day")
    ) {
      days.push({
        title: day.format("dddd, DD MMMM  YYYY"),
        date: day.format("jYYYY/jMM/jDD"),
      });
    }

    return (
      <Tbody>
        {days.map((day) => {
          return (
            <Tr>
              <Td fontSize="15">{day.title}</Td>
              {mealTimes?.map((mealTime) => {
                const isAvailable = menus?.some(
                  (menu) =>
                    menu.mealTimes?._id === mealTime._id &&
                    day.date === menu.date,
                );

                const isReserved = menus
                  ?.filter(
                    (menu) =>
                      menu.date === day.date &&
                      menu.mealTimes?._id === mealTime._id,
                  )
                  ?.some((menu) =>
                    reserveds?.find((reserve) => reserve.menu._id === menu._id),
                  );
                return (
                  <Td>
                    {isAvailable ? (
                      <HStack
                        fontSize="15"
                        color={isReserved ? "blue.300" : "red.300"}
                      >
                        <Text>{isReserved ? "رزرو شده" : "رزرو نشده"}</Text>
                        <Button
                          size="xs"
                          colorScheme="blue"
                          variant="unstyled"
                          onClick={() =>
                            handleToggleReserveModal(
                              menus
                                ?.filter(
                                  (menu) =>
                                    day.date === menu.date &&
                                    menu.mealTimes?._id === mealTime._id,
                                )
                                .map((menu) => {
                                  menu.isReserved =
                                    menu.date === day.date &&
                                    menu.mealTimes?._id === mealTime._id &&
                                    !!reserveds?.find(
                                      (reserve) =>
                                        reserve.menu._id === menu._id,
                                    );

                                  menu.userId = user?.user?.id;
                                  return menu;
                                }),
                            )
                          }
                        >
                          <FiEye fontSize={15} />
                        </Button>
                      </HStack>
                    ) : (
                      <HStack fontSize="15" color="gray.300">
                        <Text>تعریف نشده</Text>
                      </HStack>
                    )}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    );
  };
  return (
    <TableContainer width="100%">
      <PanelReserveModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMenuItems={selectedMenuItems}
      />
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
            {mealTimes?.map((mealTime) => (
              <Th>{mealTime.title}</Th>
            ))}
          </Tr>
        </Thead>
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
};

export default PanelReserveState;
