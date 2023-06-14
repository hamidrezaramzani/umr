import { HStack, Spinner, VStack } from "@chakra-ui/react";
import PanelCart from "../../components/Panel/PanelCart/PanelCart";
// import PanelMenu from "../../components/Panel/PanelMenu/PanelMenu";
import PanelReserveState from "../../components/Panel/PanelReserveState/PanelReserveState";
import PanelStatus from "../../components/Panel/PanelStatus/PanelStatus";
import PanelHeader from "../../components/Panel/PanelHeader/PanelHeader";
import PanelFoodVote from "../../components/Panel/PanelFoodVote/PanelFoodVote";
import PanelTransactions from "../../components/Panel/PanelTransactions/PanelTransactions";
import { IMeal } from "../Admin/ManageMeals/ManageMealsPage";
import { IMealTime } from "../Admin/ManageMealTimes/ManageMealTimesForm";
import { IExtraMeal } from "../Admin/ManageExtraMeals/ManageExtraMeals";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getPanelValues } from "../../api/panel/panel";
import { IPanelValues, PanelContext } from "../../context/PanelProvider";
// import { useEffect, useState } from "react";
// import { IMealTime } from "../Admin/ManageMealTimes/ManageMealTimesForm";
export interface IMenuItem {
  _id?: string;
  date?: string;
  meal?: IMeal;
  mealTimes?: IMealTime;
  extraMeals?: IExtraMeal[];
  isReserved?: boolean;
  userId?: string;
  reservationDateRange?: string[];
}

export interface IUser {
  _id: string;
  fullName: string;
  studentNumber: string;
  meliCode: string;
  password: string;
  birthday: string;
  type: "student" | "admin";
  balance: number;
}

export interface IReserve {
  _id?: string;
  user: IUser;
  menu: IMenuItem;
}

const PanelPage = () => {
  const [loading, setLoading] = useState(false);
  const {
    panelValues: { mealTimes, menus, reserveds, todayReserves, transactions },
    initialValues,
  } = useContext(PanelContext);
  useEffect(() => {
    const fetchPanelValues = async () => {
      try {
        setLoading(true);
        const { data } = await getPanelValues<IPanelValues>();
        initialValues(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("خطای در سمت سرور رخ داده است مجدد امتحان کنید");
      }
    };
    fetchPanelValues();
  }, []);

  return (
    <HStack width="100%" position="relative" align="start" p="8" bg="#eee">
      <VStack zIndex={10} justify="center" width="100%">
        <PanelHeader />
        {loading ? (
          <HStack width="100%" justify="center" height="80vh">
            <Spinner size="xl" color="blue.800" />
          </HStack>
        ) : (
          <HStack
            width="100%"
            flexDirection={["column", "row"]}
            alignItems="start"
            justify="center"
            flexWrap="wrap"
          >
            <VStack width={["100%", "20%"]}>
              <PanelStatus todayReserves={todayReserves} />
              <PanelFoodVote />
            </VStack>
            <VStack
              width={["100%", "50%"]}
              p="5"
              bg="white"
              height="auto"
              rounded="md"
            >
              <PanelReserveState
                menus={menus}
                mealTimes={mealTimes}
                reserveds={reserveds}
              />
            </VStack>
            <VStack width={["100%", "20%"]} height="80vh">
              <PanelCart />
              <PanelTransactions transactions={transactions} />
            </VStack>
          </HStack>
        )}
      </VStack>
    </HStack>
  );
};

export default PanelPage;
