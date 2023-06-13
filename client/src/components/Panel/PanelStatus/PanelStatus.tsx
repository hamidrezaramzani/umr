import { HStack, VStack, Text, Tag, Button } from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import PanelStatusItem from "./PanelStatusItem";
import * as moment from "jalali-moment";
import { useEffect, useState } from "react";
import { IReserve } from "../../../pages/Panel/PanelPage";
import { getTodayRerservesRequest } from "../../../api/reserve/reserve";
const PanelStatus = () => {
  const [todayReserves, setTodayReserved] = useState<IReserve[]>([]);
  const todayDate = moment(new Date().toISOString())
    .locale("fa")
    .format("jYYYY/jMM/jDD");
  useEffect(() => {
    const getTodayReserves = async () => {
      const { data } = await getTodayRerservesRequest();
      console.log(data);

      setTodayReserved(data);
    };
    getTodayReserves();
  }, []);
  const renderTodayFoods = () => {
    return todayReserves.length ? (
      todayReserves.map((reserve) => (
        <PanelStatusItem
          menuId={reserve.menu._id}
          type={reserve.menu.mealTimes?.title}
          extra={reserve.menu.extraMeals}
          isReserved={true}
          image={reserve.menu.meal?.image}
          title={reserve.menu.meal?.name}
        />
      ))
    ) : (
      <HStack height="300px" width="100%" justify="center">
        <Text>برای امروز رزروی ندارید</Text>
      </HStack>
    );
  };
  return (
    <VStack
      height="auto"
      justify="center"
      rounded="md"
      width="full"
      gap="5"
      bg="#fff"
      p="5"
    >
      <HStack width="100%">
        <HStack justify="space-between" color="gray.600" width="100%">
          <Text>رزرو شده ها</Text>{" "}
          <Button size="xs" colorScheme="blue">
            {todayDate}&nbsp;
          </Button>
        </HStack>
      </HStack>
      {renderTodayFoods()}
    </VStack>
  );
};

export default PanelStatus;
