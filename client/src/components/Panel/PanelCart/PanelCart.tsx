import {
  VStack,
  Heading,
  Tag,
  Box,
  Text,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import { HiOutlineChevronDown } from "react-icons/hi";

const PanelCart = () => {
  return (
    <VStack width="100%" bg="white" p="5" rounded="md" gap="5">
      <HStack width="100%">
        <HStack
          justify="space-between"
          alignItems="center"
          color="gray.600"
          width="100%"
        >
          <Text>کیف پول</Text>{" "}
          <Button size="xs" colorScheme="blue">
            افزایش اعتبار &nbsp;
            <HiOutlineChevronDown />
          </Button>
        </HStack>
      </HStack>
      <VStack
        width="100%"
        className="cart"
        justify="space-between"
        height="180"
        rounded="lg"
        p="3"
      >
        <Box>
          <Badge colorScheme="linkedin" variant="solid">
            ۱۴۰۲/۰۲/۲۹
          </Badge>
        </Box>
        <Box>
          <Heading color="#fff"></Heading>
        </Box>
        <Box>
          <Heading fontSize="30" color="#fff" dir="ltr">
            99211033302014
          </Heading>
        </Box>
        <Box alignItems="center" gap="10px" display="flex" flexDir="column">
          <Text color="linkedin.200">حمیدرضا رمضانی</Text>
          <Tag colorScheme="blue">اعتبار: ۳۰۰۰ تومان</Tag>
        </Box>
      </VStack>
    </VStack>
  );
};

export default PanelCart;
