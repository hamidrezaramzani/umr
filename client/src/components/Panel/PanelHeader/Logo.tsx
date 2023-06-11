import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.jpg";

const Logo = () => {
  return (
    <Link to="/">
      <Image src={logo} rounded="full" width="20" />
    </Link>
  );
};

export default Logo;
