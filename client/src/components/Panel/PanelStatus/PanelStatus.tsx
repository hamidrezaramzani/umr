import { HStack, VStack, Text, Tag, Button } from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
import PanelStatusItem from "./PanelStatusItem";
const PanelStatus = () => {
  const todayFoods = [
    {
      id: 1,
      title: "صبحانه ایرانی",
      type: "صبحانه",
      extra: ["مربا", "چایی", "پنیر"],
      image:
        "https://renaissance-res.com/wp-content/uploads/2020/08/WhatsApp-Image-2022-08-27-at-2.16.27-PM.jpeg",
    },
    {
      id: 2,
      title: "چلوخورشت قرمه سبزی",
      type: "ناهار",
      extra: ["ماست", "سبزی", "نوشابه"],
      image:
        "https://hs3-cdn-saas.behtarino.com/media/deal_images/kstkrlyitj-6650020.jpg",
    },
    {
      id: 3,
      title: "شنیسل مرغ",
      type: "شام",
      extra: ["ماست", "سالاد", "دوغ"],
      image:
        "https://www.crumbtopbaking.com/wp-content/uploads/2022/09/Air-Fryer-Chicken-Schnitzel-Featured.jpg",
    },
  ];

  const renderTodayFoods = () => {
    return todayFoods.map((food) => (
      <PanelStatusItem key={food.id} {...food} />
    ));
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
            ۶ خرداد ۱۴۰۲ &nbsp;
            <HiOutlineChevronDown />
          </Button>
        </HStack>
      </HStack>
      {renderTodayFoods()}
    </VStack>
  );
};

export default PanelStatus;
