import { HStack, Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import MainContainer from "../../MainContainer/MainContainer";
import Sidebar from "../Sidebar/Sidebar";

interface AdminDashboardContainerProps {
  children: ReactNode;
}
const AdminDashboardContainer = ({
  children,
}: AdminDashboardContainerProps) => {
  return (
    <MainContainer>
      <HStack justify="center">
        <HStack width="100%">
          <Sidebar />
          <Box width="80%" px="10">
            <Box width="full" mb="5">
              <Heading fontSize="lg">اضافه کردن دانشجوی جدید</Heading>
            </Box>
            {children}
          </Box>
        </HStack>
      </HStack>
    </MainContainer>
  );
};

export default AdminDashboardContainer;
