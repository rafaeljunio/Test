import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Select, FormLabel, Center, Square, Text, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue, Icon } from "@chakra-ui/react";
import {SubmitHandler, useForm} from 'react-hook-form'
import { RiDeleteBin6Line } from "react-icons/ri";

import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { Input } from "../../../components/Form/Input";

type SaveOrderFormData = {

  client_id: string

  street: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  complement: string
  status: 'active' | 'inactive' | 'in construction'
}

export default function CreateOrder() {

  const { handleSubmit, formState } = useForm()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const [client_id, setClientId] = useState('');
  const [validation_client_id, setValidationClientId] = useState(false);

  const [order_id, setOrderId] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [complement, setComplement] = useState('');

  const [status, setStatus] = useState('');

  const [codProduct, setCodProduct] = useState('');
  const [quantityProduct, setQuantityProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [unitValueProduct, setUnitValueProduct] = useState('');
  const [totalValueProduct, setTotalValueProduct] = useState('');

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);


  const {id} = router.query;

  const saveOrder = async () => {
    const response = await api.post('/orders', {
      client_id,
      status: 'active',
      order_products: [],
    })

    setOrderId(response.data.id)
  };

  const getOrder = async (id: number) => {
    const res = await api.get(`/orders/${id}`)

    if(res && res.data){
      setOrderId(res.data.order_id)
      setClientId(res.data.client.id)
      setName(res.data.client.name)
      setStreet(res.data.client.street)
      setNeighborhood(res.data.client.neighborhood)
      setCity(res.data.client.city)
      setState(res.data.client.state)
      setZip_code(res.data.client.zip_code)
      setComplement(res.data.client.complement)
      setStatus(res.data.client.status)

      let totalOrder = 0

      await res.data.products.map(async product => {
        totalOrder += (product.unit_value * product.quantity)
        setTotal(totalOrder)

        Object.assign(product, {
          unit_value_format: product.unit_value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        })
      })

      setProducts(res.data.products)
    }
  };

  const editOrder = async () => {
    const res = await api.put(`/orders/${id}`, {
      name,
      street,
      neighborhood,
      city,
      state,
      zip_code,
      complement,
      status
    })
    return res.data
  };

  const getClient = async () => {
    const res = await api.get(`/clients/${client_id}`, {
      headers: {
        OnlyActive: 1
      }
    })

    setName(res.data.name)
    setStreet(res.data.street)
    setNeighborhood(res.data.neighborhood)
    setCity(res.data.city)
    setState(res.data.state)
    setZip_code(res.data.zip_code)
    setComplement(res.data.complement)

    if(res && res.data){
      saveOrder()
      setValidationClientId(false)
    }else{
      setValidationClientId(true)

      setName('')
      setStreet('')
      setNeighborhood('')
      setCity('')
      setState('')
      setZip_code('')
      setComplement('')
    }

    return res.data
  }

  const getProduct = async () => {
    const res = await api.get(`/products/${codProduct}`, {
      headers: {
        OnlyActive: 1
      }
    })

    if(res && res.data){
      setDescriptionProduct(res.data.description)
      setUnitValueProduct(res.data.unit_value)
    }
  }

  const handleCreateOrder: SubmitHandler<SaveOrderFormData> = async () => {
    if(isEditing){
      await editOrder()
    }else{
      await saveOrder()
    }
    router.push('/orders')
  }

  const handleCalcTotal = () => {
    const total = (+quantityProduct * +unitValueProduct)
    setTotalValueProduct(String(total))
  }

  const handleAddProduct = async () => {
    await api.post(`/orders/add-product`,{
      order_id,
      product_id: codProduct,
      quantity: quantityProduct,
      unit_value: unitValueProduct
    })

    setCodProduct('')
    setQuantityProduct('')
    setDescriptionProduct('')
    setUnitValueProduct('')
    setTotalValueProduct('')

    getOrder(+order_id)
  }

  const handleDeleteOrderProduct = async(id) => {
    await api.delete(`orders/remove-product/${id}`)
    getOrder(+order_id)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  useEffect( () => {
    if(String(router.query.id) !== 'create'){
      getOrder(+router.query.id)
      setIsEditing(true)
    }
  }, []);

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.50"
          p={["3", "5"]}
          onSubmit={handleSubmit(handleCreateOrder)}
        >
          <Heading size="md" fontWeight="normal">Formulário pedido</Heading>


          <Divider my="4" borderColor="gray.50" />
          <Heading size="sm" fontWeight="normal">Dados do Cliente</Heading>
          <Divider my="2" borderColor="gray.700" />

          <VStack spacing="1">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Box w="30%">
                <FormLabel style={{fontSize: '13px'}}>Digite o código do cliente para pesquisar</FormLabel>
                <Input
                  value={client_id}
                  name="client_id"
                  onChange={event => setClientId(event.target.value)}
                  onBlur={() => getClient()}
                  disabled={isEditing ?? true}
                />
                {validation_client_id ? <Text style={{color: 'red'}}>Cliente não encontrado</Text>: null}
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Nome</FormLabel>
                <Input
                  value={name}
                  name="name"
                  onChange={event => setName(event.target.value)}
                  disabled={true}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["2", "2"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Rua</FormLabel>
                <Input
                  value={street}
                  name="street"
                  onChange={event => setStreet(event.target.value)}
                  disabled={true}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Complemento</FormLabel>
                <Input
                  value={complement}
                  name="complement"
                  onChange={event => setNeighborhood(event.target.value)}
                  disabled={true}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Bairro</FormLabel>
                <Input
                  value={neighborhood}
                  name="neighborhood"
                  onChange={event => setNeighborhood(event.target.value)}
                  disabled={true}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Cidade</FormLabel>
                <Input
                  value={city}
                  name="city"
                  onChange={event => setCity(event.target.value)}
                  disabled={true}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Estado</FormLabel>
                <Input
                  value={state}
                  name="state"
                  onChange={event => setState(event.target.value)}
                  disabled={true}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>CEP</FormLabel>
                <Input
                  value={zip_code}
                  name="zip_code"
                  onChange={event => setZip_code(event.target.value)}
                  disabled={true}
                />
              </Box>
            </SimpleGrid>
          </VStack>

          <Divider my="4" borderColor="gray.50" />
          <Heading size="sm" fontWeight="normal">Adicionar Produto</Heading>
          <Divider my="2" borderColor="gray.700" />

          <HStack w="100%">
            <Box w="10%">
              <FormLabel style={{fontSize: '13px'}}>Cod.</FormLabel>
              <Input
                value={codProduct}
                name="codProduct"
                onChange={event => setCodProduct(event.target.value)}
                onBlur={() => getProduct()}
              />
            </Box>

            <Box w="10%">
              <FormLabel style={{fontSize: '13px'}}>Quantidade</FormLabel>
              <Input
                value={quantityProduct}
                name="quantityProduct"
                onChange={event => setQuantityProduct(event.target.value)}
                onBlur={() => handleCalcTotal()}
              />
            </Box>

            <Box w="40%">
              <FormLabel style={{fontSize: '13px'}}>Descrição</FormLabel>
              <Input
                value={descriptionProduct}
                name="descriptionProduct"
                onChange={event => setDescriptionProduct(event.target.value)}
                disabled={true}
              />
            </Box>

            <Box w="15%">
              <FormLabel style={{fontSize: '13px'}}>Valor Unitário</FormLabel>
              <Input
                value={unitValueProduct}
                name="unitValueProduct"
                onChange={event => setUnitValueProduct(event.target.value)}
                disabled={true}
              />
            </Box>

            <Box w="15%">
              <FormLabel style={{fontSize: '13px'}}>Total</FormLabel>
              <Input
                value={totalValueProduct}
                name="totalValueProduct"
                disabled={true}
              />
            </Box>

            <Box>
              <FormLabel style={{fontSize: '13px'}}>&nbsp;</FormLabel>
                <Button
                  colorScheme="green"
                  color="white"
                  onClick={()=>handleAddProduct()}
                  size="sm"
                >
                  Adicionar
                </Button>
            </Box>
          </HStack>

          <Divider mt="8" mb="3" borderColor="gray.50" />
          <Heading size="sm" fontWeight="normal">Lista de Produtos</Heading>
          <Divider mt="3" mb="3" borderColor="gray.700" />

          <Table style={{fontSize: '13px'}}>
            <Thead>
              <Tr>
                <Th>Quantidade</Th>
                <Th>Descrição</Th>
                <Th>Unidade de Medida</Th>
                <Th>valor Unitário</Th>
                <Th>Total Produto</Th>
                <Th width="1">Excluir</Th>
              </Tr>
            </Thead>
            <Tbody >
              {
                products.map(product => {
                  return (
                    <Tr  style={{height: '10px'}} key={product.id}>
                      <Td>
                        <Box>
                          <Text>{product.quantity}</Text>
                        </Box>
                        </Td>
                      <Td>
                        <Box>
                          <Text>{product.description}</Text>
                        </Box>
                        </Td>
                      <Td>
                        <Box>
                          <Text>{product.unit_of_measurement}</Text>
                        </Box>
                        </Td>
                      <Td>
                        <Box>
                          <Text>{formatter.format(product.unit_value)}</Text>
                        </Box>
                        </Td>
                      <Td>
                        <Box>
                          <Text>{formatter.format(product.unit_value * product.quantity)}</Text>
                        </Box>
                      </Td>
                      <Td>
                        <Button
                          as="a"
                          size="xs"
                          fontSize="sm"
                          colorScheme="red"
                          leftIcon={<Icon as={RiDeleteBin6Line} />}
                          onClick={()=>handleDeleteOrderProduct(product.id)}
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

          <Flex mt="8" justify="flex-end">
            <Box>
              <Heading size="md" fontWeight="normal">TOTAL: {formatter.format(total)}</Heading>
            </Box>
          </Flex>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/orders" passHref>
                <Button colorScheme="red"  color="white">Cancelar</Button>
              </Link>

              <Link href="/orders" passHref>
                <Button colorScheme="blue">Finalizar pedido</Button>
              </Link>
            </HStack>
          </Flex>

        </Box>
      </Flex>
    </Box>
  )
}
