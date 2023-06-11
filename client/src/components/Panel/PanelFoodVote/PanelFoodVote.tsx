import { Button, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";
const PanelFoodVote = () => {
  const renderFoodsForVote = () => {
    const foods = [
      {
        title: "چلو خورشت قرمه سبزی",
        value: 20,
        scheme: "blue",
      },

      {
        title: "کوکو سبزی",
        value: 50,
        scheme: "teal",
      },

      {
        title: "چلو خورشت قیمه با سیب زمینی",
        value: 80,
        scheme: "red",
      },

      {
        title: "استانبولی پلو با گوشت(همون سویا)",
        value: 15,
        scheme: "green",
      },
    ];

    return foods.map((food) => (
      <VStack alignItems="start" width="100%">
        <Text color="gray.600" fontSize="15">
          {food.title}
        </Text>
        <Progress
          width="100%"
          colorScheme={food.scheme}
          value={food.value}
          hasStripe
        />
      </VStack>
    ));
  };
  return (
    <VStack bg="white" gap="5" rounded="md" p="5" width="100%">
      <VStack width="100%">
        <HStack justify="space-between" color="gray.600" width="100%">
          <Text>نظرسنجی غذاها</Text>{" "}
          <Button size="xs" colorScheme="blue">
            ناهار &nbsp;
            <HiOutlineChevronDown />
          </Button>
        </HStack>
      </VStack>
      <VStack width="100%" gap="5">
        <Text width="100%" fontSize="15" color="gray.700">
          به غذاهای مورد نظر خودتون امتیاز بدید
        </Text>
        {renderFoodsForVote()}
        <Button width="100%" colorScheme="blue" size="sm">تغییر رای</Button>
      </VStack>
    </VStack>
  );
};

export default PanelFoodVote;
