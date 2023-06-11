import { Box, HStack, Image } from "@chakra-ui/react";
import student from "../../../assets/images/student.png";
import { BiBell, BiMessageSquareDetail } from "react-icons/bi";
const UserMenu = () => {
  return (
    <HStack>
      <HStack>
        <Box mx="2">
          <BiBell fontSize="23" color="#fff" />
        </Box>
        <Box mr="5">
          <BiMessageSquareDetail fontSize="23" color="#fff" />
        </Box>
      </HStack>
      <Box>
        <Image src={student} width="14" objectFit="cover" rounded="full" />
      </Box>
    </HStack>
  );
};

export default UserMenu;
