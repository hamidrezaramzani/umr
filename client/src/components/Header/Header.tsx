import { HStack } from "@chakra-ui/react";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <HStack justify="space-between" p="3" rounded="base">
      <Navbar />
      <Logo />
    </HStack>
  );
};

export default Header;
