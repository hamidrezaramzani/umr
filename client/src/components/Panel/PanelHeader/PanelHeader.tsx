import { HStack } from "@chakra-ui/react";
import Logo from "./Logo";
import PanelNavbar from "./Navbar";
import UserMenu from "./UserMenu";
const PanelHeader = () => {
  return (
    <HStack
      width="100%"
      justify="space-between"
      height="24"
      rounded="2xl"
      bg="blue.700"
      py="3"
      px="6"
    >
      <Logo />
      <PanelNavbar />
      <UserMenu />
    </HStack>
  );
};

export default PanelHeader;
