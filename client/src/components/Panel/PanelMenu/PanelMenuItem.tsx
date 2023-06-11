import { VStack, Heading, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface PanelMenuItemProps {
  Icon: IconType;
  title: string;
  description: string;
}
const PanelMenuItem = ({ Icon, title, description }: PanelMenuItemProps) => {
  return (
    <VStack
      _hover={{ bg: "blue.800" }}
      p="3"
      justifyItems="center"
      bg="blue.700"
      rounded="md"
    >
      <Link to="/">
        <VStack gap="2">
          <Icon fontSize="45" color="#fff" className="panel-menu-icon" />
          <Heading fontSize="18" color="#fff">
            {title}
          </Heading>
          <Text fontSize="12" textAlign="center" color="#fff">
            {description}
          </Text>
        </VStack>
      </Link>
    </VStack>
  );
};

export default PanelMenuItem;
