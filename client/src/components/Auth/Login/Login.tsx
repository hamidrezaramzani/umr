import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const Login = () => {
  return (
    <Box width="50%">
      <form>
        <Box>
          <Heading color="linkedin.700">ورود به سامانه</Heading>
          <Text color="gray.500">
            با ورود به سامانه رزرو دانشجویی در سریع ترین حالت ممکن غذای مورد نظر
            خود را رزرو کنید و غذاهایی که در گذشته رزرو کردید را مدیریت کنید
          </Text>
        </Box>
        <FormControl mt="3" mb="3">
          <FormLabel>نام کاربری</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl>
          <FormLabel>رمز عبور</FormLabel>
          <Input type="password" />
        </FormControl>

        <Button colorScheme="linkedin" mt="3" w="full">
          ورود به حساب
        </Button>
      </form>
    </Box>
  );
};

export default Login;
