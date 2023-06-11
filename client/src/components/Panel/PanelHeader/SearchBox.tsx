import { Box, Button, Input } from "@chakra-ui/react";

const SearchBox = () => {
  return (
    <Box width="500px" height="60px" position="relative">
      <Input
        width="100%"
        height="50px"
        borderColor="#fff"
        _placeholder={{ color: "#fff" }}
        color="#fff"
        placeholder="جستجو کنید"
      />
      <Button
        colorScheme="whiteAlpha"
        position="absolute"
        top="0"
        height="50px"
        right="0"
      >
        جستجو
      </Button>
    </Box>
  );
};

export default SearchBox;
