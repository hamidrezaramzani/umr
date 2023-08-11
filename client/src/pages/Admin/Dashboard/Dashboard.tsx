import { HStack } from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";
import DashboardDetail from "../../../components/Admin/DashboardDetail/DashboardDetail";

const Dashboard = () => {
  return (
    <AdminDashboardContainer title="داشبورد">
      <HStack wrap="wrap">
        <DashboardDetail width="49%" title="لیست آخرین دانشجوها">
          Hello
        </DashboardDetail>

        <DashboardDetail width="49%" title="پر امتیاز ترین غذاهای سایت">
          Hello
        </DashboardDetail>

        <DashboardDetail width="100%" title="نمودار هفتگی رزرو غذا">
          Hello
        </DashboardDetail>
      </HStack>
    </AdminDashboardContainer>
  );
};

export default Dashboard;
