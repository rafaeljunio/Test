import React, {useState, useEffect} from 'react';

import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiDeleteBackLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from '../../services/api';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const {data} = await api.post('clients/list', {
      name: ""
    })

    const userData = data.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })

    setUsers(userData)
  }

  useEffect(() => {
    loadUsers()
  }, []);


  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.50" p="5">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="normal">Clientes</Heading>
            <Link href="/users/create" passHref>
              <Button
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          <Table>
            <Thead>
              <Tr>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
                <Th width="1">Editar</Th>
                <Th width="1">Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users.map(user => {
                  return (
                    <Tr key={user.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.700">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td> {user.created_at} </Td>}
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="green"
                          leftIcon={<Icon as={RiPencilLine} />}
                        >
                          {isWideVersion ? 'Editar' : ''}
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="red"
                          leftIcon={<Icon as={RiDeleteBackLine} />}
                        >
                          Excluir
                        </Button>
                      </Td>
                    </Tr>
                      )
                    })
                  }
            </Tbody>
          </Table>
          <Pagination />
        </Box>
      </Flex>
    </Box>
  )
}
