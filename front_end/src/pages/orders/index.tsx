import React, {useState, useEffect} from 'react';

import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiDeleteBackLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from '../../services/api';
import { useRouter } from 'next/router';

export default function OrderList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.post('orders/list', {
      name: ""
    })

    console.log(res)

    const orderData = res.data.map(order => {
      return {
        order_id: order.order_id,
        name: order.name,
        created_at: new Date(order.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    })
    setOrders(orderData)
  }

  const router = useRouter();

  function handleEditOrder(id) {
    console.log(id)
    router.push({
      pathname: `/orders/${id}`,
    });
  }

  async function handleDeleteOrder(id) {
    const {data} = await api.delete(`orders/${id}`)
    loadOrders()
  }

  useEffect(() => {
    loadOrders()
  }, []);


  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.50" p="5">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="md" fontWeight="normal">Pedidos</Heading>
            <Link href="/orders/create" passHref>
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
                <Th>Nome do cliente</Th>
                {isWideVersion && <Th>Data de Cadastro</Th>}
                <Th width="1">Editar</Th>
                <Th width="1">Excluir</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                orders.map(order => {
                  return (
                    <Tr key={order.order_id}>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{order.name}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td> {order.created_at} </Td>}
                      <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="green"
                            leftIcon={<Icon as={RiPencilLine} />}
                            onClick={()=>handleEditOrder(order.order_id)}
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
                          onClick={()=>handleDeleteOrder(order.order_id)}
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
