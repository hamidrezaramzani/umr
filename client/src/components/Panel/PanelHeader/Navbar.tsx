import { HStack, Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
const PanelNavbar = () => {
  return (
    <HStack gap="5">
      <Link color="#fff" as={ReactLink}>فروش</Link>
      <Link color="#fff" as={ReactLink}>انتقال اعتبار</Link>
      <Link color="#fff" as={ReactLink}>هم گروهی</Link>
      <Link color="#fff" as={ReactLink}>تنظیمات حساب</Link>
    </HStack>
  );
};

export default PanelNavbar;
