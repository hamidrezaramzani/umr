import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { wordBook } from "../../../helpers/wordBook";
import { loginRequest } from "../../../api/auth/auth";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserProvider";
import { useNavigate } from "react-router";
export interface LoginFormValuesType {
  meliCode: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useContext(UserContext);
  useEffect(() => {
    if (user?.isLogged) {
      if (user.user?.type === "student") {
        navigate("/panel");
      } else {
        navigate("/admin/dashboard");
      }
    }
  }, [navigate, user]);
  const schema = Yup.object().shape({
    meliCode: Yup.string().required(
      wordBook.format(
        wordBook.fields.auth.meliCode.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
    password: Yup.string().required(
      wordBook.format(
        wordBook.fields.auth.password.fa,
        wordBook.messages.validation.required.fa,
      ),
    ),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValuesType>({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (values: LoginFormValuesType) => {
    try {
      const { data } = await loginRequest(values);
      toast.success(wordBook.messages.success.logged.fa);
      login(data.user);
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        toast.error(wordBook.messages.errors.invalidMellicodeOrPassword.fa);
      } else {
        toast.error(wordBook.messages.errors.serverInternalError.fa);
      }
    }
  };
  return (
    <Box width="50%">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box>
          <Heading color="linkedin.700">
            {wordBook.titles.auth.signIn.fa}
          </Heading>
          <Text color="gray.500">
            {wordBook.descriptions.auth.signInToAccount.fa}
          </Text>
        </Box>
        <FormControl mt="3" mb="3">
          <FormLabel>{wordBook.fields.auth.meliCode.fa}</FormLabel>
          <Input type="text" {...register("meliCode")} name="meliCode" />
          <FormErrorMessage>{errors?.meliCode?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>{wordBook.fields.auth.password.fa}</FormLabel>
          <Input type="password" {...register("password")} name="password" />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" type="submit" mt="3" w="full">
          {wordBook.button.auth.login.fa}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
