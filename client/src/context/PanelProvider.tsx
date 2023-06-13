/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import { ITransaction } from "../components/Panel/PanelTransactions/PanelTransactions";
import { IMealTime } from "../pages/Admin/ManageMealTimes/ManageMealTimesForm";
import { IMenuItem, IReserve, IUser } from "../pages/Panel/PanelPage";

export interface IPanelValues {
  user?: IUser;
  menus?: IMenuItem[];
  mealTimes?: IMealTime[];
  reserveds?: IReserve[];
  todayReserves?: IReserve[];
  transactions?: ITransaction[];
}

interface PanelContextProps {
  panelValues: IPanelValues;
  setReserve: (data: IPanelValues) => void;
  initialValues: (values: IPanelValues) => void;
}
export const PanelContext = React.createContext<PanelContextProps>({
  panelValues: {},
  setReserve: (data: IPanelValues) => {},
  initialValues(values: IPanelValues) {},
});

interface PanelProviderProps {
  children: React.ReactNode;
}
const PanelProvider = ({ children }: PanelProviderProps) => {
  const [panelValues, setPanelValues] = React.useState({});

  const initialValues = (values: IPanelValues) => {
    setPanelValues(values);
  };
  const setReserve = (data: IPanelValues) => {
    setPanelValues(data);
  };
  return (
    <PanelContext.Provider value={{ panelValues, setReserve, initialValues }}>
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
