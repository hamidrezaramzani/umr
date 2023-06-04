import { Box, HStack, Image } from "@chakra-ui/react";
import MainContainer from "../../components/MainContainer/MainContainer";
import Welcome from "../../components/Welcome/Welcome";
import vector from "../../assets/images/vector.png"
const HomePage = () => {
  return (
    <MainContainer>
      <HStack
        justify="space-between"
        p="14"
        bg="purple.50"
        px="5"
        rounded="base"
        flexWrap="wrap"
      >
        <Welcome />
        <Box width="50%">
          <Image src={vector} />
        </Box>
      </HStack>
    </MainContainer>
  );
};

export default HomePage;
