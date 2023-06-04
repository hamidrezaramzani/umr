import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { adminSidebarItems } from "../../../constants/AdminSidebar";

const Sidebar = () => {
  return (
    <Box width="20%">
      <Accordion defaultIndex={[0, 1, 2, 3]}>
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
              <AccordionPanel pb={4} color="linkedin.900">
                <Link to={sidebarChild.link}>{sidebarChild.title}</Link>
              </AccordionPanel>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default Sidebar;
