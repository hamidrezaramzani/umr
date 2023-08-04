import {
  HStack,
  VStack,
  Text,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import PanelStatusItem from "./PanelStatusItem";
import  moment from "jalali-moment";
import { IReserve } from "../../../pages/Panel/PanelPage";

interface PanelStatusProps {
  todayReserves?: IReserve[];
}
const PanelStatus = ({ todayReserves }: PanelStatusProps) => {
  const todayDate = moment(new Date().toISOString())
    .locale("fa")
    .format("jYYYY/jMM/jDD");
  const renderTodayFoods = () => {
    const filteredReserves = todayReserves?.filter(
      (reserve) => !reserve.isMovedToSale,
    );

    return filteredReserves?.length ? (
      filteredReserves.map((reserve) => (
        <PanelStatusItem
          key={reserve._id}
          isTodayReserve={true}
          isReserved={true}
          reserveId={reserve._id}
          menuId={reserve.menu._id}
          type={reserve.menu.mealTimes?.title}
          extra={reserve.menu.extraMeals}
          image={reserve.menu.meal?.image}
          title={reserve.menu.meal?.name}
          mealTimeId={reserve.menu.mealTimes?._id}
          price={reserve.menu.meal?.price}
          isForSale={false}
        />
      ))
    ) : (
      <HStack height="300px" width="100%" justify="center">
        <Text>برای امروز رزروی ندارید</Text>
      </HStack>
    );
  };

  const renderTodaySales = () => {
    const filteredReserves = todayReserves?.filter(
      (reserve) => reserve.isMovedToSale,
    );
    return filteredReserves?.length ? (
      filteredReserves.map((reserve) => (
        <PanelStatusItem
          key={reserve._id}
          isTodayReserve={true}
          isReserved={true}
          reserveId={reserve._id}
          menuId={reserve.menu._id}
          type={reserve.menu.mealTimes?.title}
          extra={reserve.menu.extraMeals}
          image={reserve.menu.meal?.image}
          title={reserve.menu.meal?.name}
          mealTimeId={reserve.menu.mealTimes?._id}
          price={reserve.menu.meal?.price}
          isForSale={true}
        />
      ))
    ) : (
      <HStack height="300px" width="100%" justify="center">
        <Text>برای امروز فروشی ندارید</Text>
      </HStack>
    );
  };

  return (
    <VStack
      height="auto"
      justify="center"
      rounded="md"
      width="100%"
      gap="5"
      bg="#fff"
      p="5"
    >
      <Tabs width="100%">
        <TabList>
          <Tab>رزرو امروز</Tab>
          <Tab>فروش های من</Tab>
        </TabList>

        <TabPanels>
          <TabPanel width="100%">
            <HStack width="100%">
              <HStack justify="space-between" color="gray.600" width="100%">
                <Text>رزرو شده ها</Text>{" "}
                <Button size="xs" colorScheme="blue">
                  {todayDate}&nbsp;
                </Button>
              </HStack>
            </HStack>
            {renderTodayFoods()}
          </TabPanel>
          <TabPanel width="100%">
            <HStack width="100%">
              <HStack justify="space-between" color="gray.600" width="100%">
                <Text>فروش امروز</Text>{" "}
                <Button size="xs" colorScheme="blue">
                  {todayDate}&nbsp;
                </Button>
              </HStack>
            </HStack>
            {renderTodaySales()}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default PanelStatus;
