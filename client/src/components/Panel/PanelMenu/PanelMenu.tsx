import { HStack } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RiMoneyPoundBoxLine } from "react-icons/ri";
import PanelMenuItem from "./PanelMenuItem";

const PanelMenu = () => {
  return (
    <HStack width="100%" py="5" justify="space-between">
      <PanelMenuItem
        title="فروش"
        description="اگر قصد فروش غذای خود را دارید  به این قسمت مراجعه کنید"
        Icon={IoFastFoodOutline}
      />

      <PanelMenuItem
        title="انتقال اعتبار"
        description="میتوانید اعتبار خود را با دوست خود به اشتراک بگذارید"
        Icon={RiMoneyPoundBoxLine}
      />

      <PanelMenuItem
        title="تغییر رمز عبور"
        description="اینجا شما میتونید تنظیمات مربوط به رمز عبور حسابتان را عوض کنید"
        Icon={FiSettings}
      />

      <PanelMenuItem
        title="فروش"
        description="اگر قصد فروش غذای خود را دارید  به این قسمت مراجعه کنید"
        Icon={IoFastFoodOutline}
      />
    </HStack>
  );
};

export default PanelMenu;
