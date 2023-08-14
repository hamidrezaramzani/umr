import { HStack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";
import shamsipour from "../../../assets/images/shamsipour.png";
const Logo = () => {
  return (
    <HStack>
      <Link to="https://shamsipour.tvu.ac.ir/">
        <Image src={shamsipour} width="14" />
      </Link>
      <Link to="/">
        <Image src={logo} width="14" />
      </Link>
    </HStack>
  );
};

export default Logo;
