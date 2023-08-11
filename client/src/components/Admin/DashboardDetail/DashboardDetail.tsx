import { HStack, Heading, StackProps, VStack } from "@chakra-ui/react";

interface DashboardDetailProps extends StackProps {
  title: string;
}
const DashboardDetail = ({ title, ...props }: DashboardDetailProps) => {
  return (
    <VStack bg="#fcfcfc" rounded="md" p="3" {...props}>
      <HStack width="full">
        <Heading fontSize="15">{title}</Heading>
      </HStack>
    </VStack>
  );
};

export default DashboardDetail;
