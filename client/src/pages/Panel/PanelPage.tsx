import { HStack, VStack } from "@chakra-ui/react";
import PanelCart from "../../components/Panel/PanelCart/PanelCart";
// import PanelMenu from "../../components/Panel/PanelMenu/PanelMenu";
import PanelReserveState from "../../components/Panel/PanelReserveState/PanelReserveState";
import PanelStatus from "../../components/Panel/PanelStatus/PanelStatus";
import PanelHeader from "../../components/Panel/PanelHeader/PanelHeader";
import PanelFoodVote from "../../components/Panel/PanelFoodVote/PanelFoodVote";
import PanelTransactions from "../../components/Panel/PanelTransactions/PanelTransactions";
const PanelPage = () => {
  return (
    <HStack
      width="100%"
      position="relative"
      align="start"
      p="8"
      height="100vh"
      bg="#eee"
    >
      <VStack zIndex={10} justify="center" width="100%">
        <PanelHeader />
        <HStack
          width="100%"
          flexDirection={["column", "row"]}
          alignItems="start"
          justify="center"
        >
          <VStack width="20%">
            <PanelStatus />
            <PanelFoodVote />
          </VStack>
          <VStack width={"50%"} p="5" bg="white" height="auto" rounded="md">
            <PanelReserveState />
          </VStack>
          <VStack width="20%" height="80vh">
            <PanelCart />
            <PanelTransactions />
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default PanelPage;
