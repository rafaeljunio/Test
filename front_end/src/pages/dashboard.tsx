import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {

  const {user} = useContext(AuthContext)

  useEffect(()=> {
    api.get('sessions/me').then(response => console.log(response))
  }, [])


  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-star">
          <Box
            p={["6", "8"]}
            bg="gray.50"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Inscritos da semana</Text>
          </Box>
          <Box
            p={["6", "8"]}
            bg="gray.50"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lg" mb="4">Taxa de abertura</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
