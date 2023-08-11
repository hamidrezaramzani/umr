import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  HStack,
  Text,
  Avatar,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { adminSidebarItems } from "../../../constants/AdminSidebar";

const Sidebar = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");

  // Get the last segment of the URL
  const lastSegment = pathSegments[pathSegments.length - 1];
  return (
    <Box width="22%" bg="#fcfcfc" p="3" rounded="md">
      <HStack width="full">
        <Avatar />
        <VStack gap="0" align="right">
          <Heading fontSize="15">حمیدرضا رمضانی</Heading>
          <Text fontSize="12" colorScheme="blue">
            ادمین سایت
          </Text>
        </VStack>
      </HStack>
      <Accordion allowMultiple defaultIndex={[0, 1, 2]}>
        {adminSidebarItems.map((sidebarItem) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {sidebarItem.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {sidebarItem.childrens.map((sidebarChild) => (
              <AccordionPanel
                bg={
                  sidebarChild.name === lastSegment ? "telegram.100" : undefined
                }
                pb={4}
                color="linkedin.900"
              >
                <Link to={sidebarChild.link}>
                  <HStack>
                    <sidebarChild.Icon fontSize={19} />
                    <Text>{sidebarChild.title}</Text>
                  </HStack>
                </Link>
              </AccordionPanel>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Sidebar;
