import React, {useState, useEffect} from 'react';

import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
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

  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});

  const loadProducts = async () => {
    const {data} = await api.post('products/list', {
      description: ""
    })


    const productDate = data.map(product => {
      let status_format = ''

      switch(product.status){
        case 'active':
          status_format = 'Ativo'
          break;
        case 'inactive':
          status_format = 'Inativo'
          break;
        case 'in construction':
          status_format = 'Em construção'
          break;
      }

      return {
        id: product.id,
        description: product.description,
        created_at: new Date(product.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        status: status_format
      }
    })

    setProducts(productDate)
  }

  const router = useRouter();

  function handleEditProduct(id) {
    router.push({
      pathname: `/products/${id}`,
    });
  }

  async function handleDeleteProduct(id) {
    const {data} = await api.delete(`products/${id}`)
    loadProducts()
  }

  useEffect(() => {
    loadProducts()
  }, []);


  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.50" p="5">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="normal">Produtos</Heading>
            <Link href="/products/create" passHref>
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
                products.map(product => {
                  return (
                    <Tr key={product.id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{product.id}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{product.description}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td> {product.created_at} </Td>}
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{product.status}</Text>
                        </Box>
                      </Td>
                      <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            leftIcon={<Icon as={RiPencilLine} />}
                            onClick={()=>handleEditProduct(product.id)}
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
                          onClick={()=>handleDeleteProduct(product.id)}
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
