import { Box, HStack, Image } from "@chakra-ui/react";
import student from "../../../assets/images/student.png";
import Notifications from "./Notifications/Notifications";
const UserMenu = () => {
  return (
    <HStack>
      <Notifications />
      <Box>
        <Image src={student} width="14" objectFit="cover" rounded="full" />
      </Box>
    </HStack>
  );
};

export default UserMenu;
