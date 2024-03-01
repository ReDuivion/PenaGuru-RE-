// pages/index.js
import { ChakraProvider, CSSReset, Box, Flex, Text, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'blue.500',
        color: 'white',
      },
    },
  },
});

const Card = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="blue.700" color="white" p="4">
      <Text fontSize="lg" fontWeight="bold" mb="2">
        Tema Kartu Biru
      </Text>
      <Text fontSize="sm">Isi kartu biru Anda di sini...</Text>
    </Box>
  );
};

const Page = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Flex align="center" justify="center" h="100vh">
        <Card />
      </Flex>
    </ChakraProvider>
  );
};

export default Page;
