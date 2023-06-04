import { Box, Heading, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface AppPropertyItemProps {
  Icon: IconType;
  title: string;
  description: string;
}
const AppPropertyItem = ({
  Icon,
  title,
  description,
}: AppPropertyItemProps) => {
  return (
    <Box>
      <Icon fontSize="40" color="indigo" />
      <Heading fontSize="lg">{title}</Heading>
      <Text color="gray.500" fontSize="xs">
        {description}
      </Text>
    </Box>
  );
};

export default AppPropertyItem;
