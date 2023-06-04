import { Box, HStack, Image } from "@chakra-ui/react";
import Login from "../../components/Auth/Login/Login";
import MainContainer from "../../components/MainContainer/MainContainer";
import authVector from "../../assets/images/auth.png";
const LoginPage = () => {
  return (
    <MainContainer>
      <HStack justify="center" alignItems="center" width="full" height="85vh">
        <HStack width="90%">
          <Login />
          <Box width="50%">
            <Image src={authVector} width="full" />
          </Box>
        </HStack>
      </HStack>
    </MainContainer>
  );
};

export default LoginPage;
