import { HStack, Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import MainContainer from "../../MainContainer/MainContainer";
import Sidebar from "../Sidebar/Sidebar";

interface AdminDashboardContainerProps {
  children: ReactNode;
  title: string;
}
const AdminDashboardContainer = ({
  children,
  title,
}: AdminDashboardContainerProps) => {
  return (
    <MainContainer>
      <HStack justify="center">
        <HStack width="100%">
          <Sidebar />
          <Box width="80%" px="10">
            <Box width="full" mb="5">
              <Heading fontSize="lg">{title}</Heading>
            </Box>
            {children}
          </Box>
        </HStack>
      </HStack>
    </MainContainer>
  );
};

export default AdminDashboardContainer;
