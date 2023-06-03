import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Image src={logo} width="14" />
      </Link>
    </Box>
  );
};

export default Logo;
