/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import { ITransaction } from "../components/Panel/PanelTransactions/PanelTransactions";
import { IMealTime } from "../pages/Admin/ManageMealTimes/ManageMealTimesForm";
import { IMenuItem, IReserve, IUser } from "../pages/Panel/PanelPage";

export interface ISale {
  _id: string;
  user: IUser;
  menu: IMenuItem;
}
export interface IPanelValues {
  user?: IUser;
  menus?: IMenuItem[];
  mealTimes?: IMealTime[];
  reserveds?: IReserve[];
  todayReserves?: IReserve[];
  todaySales?: ISale[];
  transactions?: ITransaction[];
}

interface PanelContextProps {
  panelValues: IPanelValues;
  setPanelValues: (data: IPanelValues) => void;
  initialValues: (values: IPanelValues) => void;
}
export const PanelContext = React.createContext<PanelContextProps>({
  panelValues: {},
  setPanelValues: (_data: IPanelValues) => {},
  initialValues(_values: IPanelValues) {},
});

interface PanelProviderProps {
  children: React.ReactNode;
}
const PanelProvider = ({ children }: PanelProviderProps) => {
  const [panelValues, setPanelValuesData] = React.useState({});

  const initialValues = (values: IPanelValues) => {
    setPanelValuesData(values);
  };
  const setPanelValues = (data: IPanelValues) => {
    setPanelValuesData(data);
  };
  return (
    <PanelContext.Provider
      value={{ panelValues, setPanelValues, initialValues }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
