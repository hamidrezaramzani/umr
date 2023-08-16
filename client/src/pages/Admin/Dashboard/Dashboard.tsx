import { Text, Heading } from "@chakra-ui/react";
import AdminDashboardContainer from "../../../components/Admin/AdminDashboardContainer/AdminDashboardContainer";

const Dashboard = () => {
  return (
    <AdminDashboardContainer title="داشبورد">
      <Heading>خوش آمدید</Heading>
      <Text>به پنل ادمین خوش آمدید</Text>
    </AdminDashboardContainer>
  );
};

export default Dashboard;
