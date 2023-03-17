import React, {useState, useEffect} from 'react';

import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiDeleteBackLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from '../../services/api';
import { useRouter } from 'next/router';

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [clients, setClients] = useState([]);
  const [clientEdit, setClientEdit] = useState({});

  const loadUsers = async () => {
    const {data} = await api.post('clients/list', {
      name: ""
    })

    const clientData = data.map(user => {

      let status_client = ''

      switch(user.status){
        case 'active':
          status_client = 'Ativo'
          break;
        case 'inactive':
          status_client = 'Inativo'
          break;
        case 'in construction':
          status_client = 'Em construção'
          break;
      }


      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        status: status_client
      }
    })

    setClients(clientData)
  }

  const router = useRouter();

  function handleEditClient(id) {
    router.push({
      pathname: `/clients/${id}`,
    });
  }

  async function handleDeleteClient(id) {
    const {data} = await api.delete(`clients/${id}`)
    loadUsers()
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
            <Link href="/clients/create" passHref>
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
                <Th>ID</Th>
                <Th>Nome</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
                <Th>Status</Th>
                <Th width="1">Editar</Th>
                <Th width="1">Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                clients.map(client => {
                  return (
                    <Tr key={client.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{client.id}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{client.name}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td> {client.created_at} </Td>}
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{client.status}</Text>
                        </Box>
                      </Td>
                      <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            leftIcon={<Icon as={RiPencilLine} />}
                            onClick={()=>handleEditClient(client.id)}
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
                          onClick={()=>handleDeleteClient(client.id)}
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
        </Box>
      </Flex>
    </Box>
  )
}
