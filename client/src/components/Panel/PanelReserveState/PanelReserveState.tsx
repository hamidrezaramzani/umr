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
  VStack,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import moment from "jalali-moment";
import { MdChevronRight } from "react-icons/md";
import { IMealTime } from "../../../pages/Admin/ManageMealTimes/ManageMealTimesForm";
import { IMenuItem, IReserve } from "../../../pages/Panel/PanelPage";
import PanelReserveModal from "../PanelHeader/PanelReserveModal/PanelReserveModal";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserProvider";
import { PanelContext } from "../../../context/PanelProvider";
import QRCode from "react-qr-code";
import JSZip from "jszip";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
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
  const [currentMenuItems, setCurrentMenuItems] = useState<{
    date?: string;
    mealTimeId?: string;
  }>({
    mealTimeId: undefined,
    date: undefined,
  });
  const handleToggleReserveModal = (mealTimeId: string, date: string) => {
    setCurrentMenuItems({
      date,
      mealTimeId,
    });
    onOpen();
  };

  const { user } = useContext(UserContext);
  const [weekIndex, setWeekIndex] = useState(0);
  const { panelValues } = useContext(PanelContext);
  const selectedMenuItems =
    currentMenuItems.date && currentMenuItems.mealTimeId
      ? panelValues?.menus
          ?.filter(
            (menu) =>
              menu.mealTimes?._id === currentMenuItems.mealTimeId &&
              menu.date === currentMenuItems.date,
          )
          .map((menu) => {
            menu.isReserved = !!panelValues.reserveds?.find(
              (reserved) =>
                reserved.menu._id === menu._id &&
                reserved.menu.date === currentMenuItems.date &&
                reserved.menu.mealTimes === currentMenuItems.mealTimeId &&
                reserved.user._id === user?.user?.id,
            );
            menu.userId = user?.user?.id;
            return menu;
          })
      : [];

  const currentWeekStart = moment().locale("fa").startOf("week");
  const currentWeekEnd = moment().locale("fa").endOf("week");

  const currentWeekReserveds = panelValues?.reserveds?.filter((reserve) => {
    const momentDate = moment(reserve.menu.date, "jYYYY/jMM/jDD");
    const isBetween = momentDate.isBetween(currentWeekStart, currentWeekEnd);
    return !reserve.isMovedToSale && isBetween;
  });

  const handleAddToWeekIndex = () => {
    setWeekIndex((prevIndex) => (prevIndex += 1));
  };

  const handleSubtractToWeekIndex = () => {
    setWeekIndex((prevIndex) => (prevIndex -= 1));
  };

  const handleResetWeekIndex = () => {
    setWeekIndex(0);
  };
  const renderTableBody = () => {
    const now = moment().locale("fa");
    const nowDate = now.format("jYYYY/jMM/jDD");
    const startOfWeek = now.clone().add(weekIndex, "week").startOf("week");
    const endOfWeek = now.clone().add(weekIndex, "week").endOf("week");
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
              <Td
                fontSize="15"
                bg={day.date === nowDate ? "linkedin.50" : "white"}
              >
                {day.title}
              </Td>
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
                            handleToggleReserveModal(mealTime._id, day.date)
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

  async function handleDownloadCurrentWeekQrCode() {
    const zip = new JSZip();
    const options = { quality: 0.95 }; // Adjust the quality as needed

    if (!currentWeekReserveds?.length) {
      return;
    }
    for (const [index, { menu }] of currentWeekReserveds.entries()) {
      const svgElement = document.getElementById(`qrcode-${index}`);
      const dataUrl = await toPng(
        svgElement as unknown as HTMLElement,
        options,
      );
      const imgData = dataUrl.split(",")[1];
      zip.file(`${menu.date}-${menu.mealTimes?.title}.png`, imgData, {
        base64: true,
      });
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(
        content,
        `${currentWeekStart.format("jYYYY/jMM/jDD")}-${currentWeekEnd.format(
          "jYYYY/jMM/jDD",
        )}.zip`,
      );
    });
  }

  const isCurrentWeek = weekIndex === 0;
  return (
    <VStack
      // style={{ width: "100%" }}
      width="100%"
      p="5"
      bg="white"
      height="auto"
      rounded="md"
    >
      <TableContainer width="100%">
        <PanelReserveModal
          isOpen={isOpen}
          onClose={onClose}
          selectedMenuItems={selectedMenuItems}
        />
        <div style={{ width: "0", height: "0", overflow: "hidden" }}>
          {currentWeekReserveds?.map(({ menu, user }, index: number) => (
            <QRCode value={`${user._id}${menu._id}`} id={`qrcode-${index}`} />
          ))}
        </div>
        <HStack justify="center">
          <Heading color="gray.700" fontSize="20" width="100%">
            وضعیت رزرو این هفته
          </Heading>
          <Button size="xs" colorScheme="blue" onClick={handleAddToWeekIndex}>
            هفته بعدی
            <MdChevronRight />
          </Button>
          <Button
            size="xs"
            colorScheme="orange"
            px="2"
            onClick={handleResetWeekIndex}
          >
            هفته فعلی
            <MdChevronRight />
          </Button>
          <Button
            colorScheme="blue"
            size="xs"
            onClick={handleSubtractToWeekIndex}
          >
            هفته قبلی
            <MdChevronRight />
          </Button>
        </HStack>
        {isCurrentWeek && (
          <Button
            my="3"
            size="xs"
            colorScheme="cyan"
            onClick={handleDownloadCurrentWeekQrCode}
          >
            دانلود QRCODE های این هفته
          </Button>
        )}

        <Text mt="2" fontSize="14" color="gray.500">
          اینجا شما میتوانید وضعیت رزرو این هفته رو ببینید و همچنین برای این
          هفته رو رزرو کنید
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
    </VStack>
  );
};

export default PanelReserveState;
