import { HStack } from "@chakra-ui/react";
import AppPropertyItem from "./AppPropertyItem";
import { MdOutlineFastForward } from "react-icons/md";
const AppProperties = () => {
  return (
    <HStack w="full" gap="3" justify="space-evenly" pt="10">
      <AppPropertyItem
        Icon={MdOutlineFastForward}
        title="آسانی"
        description="تنها در چند مرحله میتوانید رزرو غذا را انجام دهید"
      />

      <AppPropertyItem
        Icon={MdOutlineFastForward}
        title="آسانی"
        description="تنها در چند مرحله میتوانید رزرو غذا را انجام دهید"
      />

      <AppPropertyItem
        Icon={MdOutlineFastForward}
        title="آسانی"
        description="تنها در چند مرحله میتوانید رزرو غذا را انجام دهید"
      />
    </HStack>
  );
};

export default AppProperties;
