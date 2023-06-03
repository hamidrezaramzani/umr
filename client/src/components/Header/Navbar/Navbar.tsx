import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { NAVS } from "../../../constants/Navbar";

const Navbar = () => {
  return (
    <HStack gap={10}>
      {NAVS.map((nav) => (
        <Link to={nav.link}>
          <Text fontSize={14}>{nav.title}</Text>
        </Link>
      ))}
    </HStack>
  );
};

export default Navbar;
