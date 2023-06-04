import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FormErrorMessageProps {
  children: ReactNode;
}
const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return (
    <Text color="red" fontSize="sm" mt="1">
      {children}
    </Text>
  );
};

export default FormErrorMessage;
