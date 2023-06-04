import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "../Header/Header";

interface MainContainerProps {
  children: ReactNode;
}
const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <Container maxW={"8xl"} py="5">
      <Header />
      {children}
    </Container>
  );
};

export default MainContainer;
