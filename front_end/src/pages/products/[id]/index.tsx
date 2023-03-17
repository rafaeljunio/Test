import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Select, FormLabel } from "@chakra-ui/react";
import {SubmitHandler, useForm} from 'react-hook-form'
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { Input } from "../../../components/Form/Input";

type SaveProductFormData = {
  name: string
  street: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  complement: string
  statusProduct: 'active' | 'inactive' | 'in construction'
}

export default function CreateProduct() {
  const { handleSubmit, formState } = useForm()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const [description, setDescription] = useState('');
  const [unitValue, setUnitValue] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [statusProduct, setStatusProduct] = useState('');

  const {id} = router.query;

  const saveProduct = async () => {
    const response = await api.post('/products', {
      description,
      unit_value: unitValue,
      unit_of_measurement: unitOfMeasurement,
      status: statusProduct
    })
  };

  const getProduct = async (id: number) => {
    const res:any = await api.get(`/products/${id}`)

    setDescription(res.data.description)
    setUnitValue(res.data.unit_value)
    setUnitOfMeasurement(res.data.unit_of_measurement)
    setStatusProduct(res.data.status)
  };

  const editProduct = async () => {
    const res = await api.put(`/products/${id}`, {
      description,
      unit_value: unitValue,
      unit_of_measurement: unitOfMeasurement,
      status: statusProduct
    })
    return res.data
  };

  const handleCreateProduct: SubmitHandler<SaveProductFormData> = async () => {
    if(isEditing){
      await editProduct()
    }else{
      await saveProduct()
    }
    router.push('/products')
  }

  useEffect( () => {
    if(String(router.query.id) !== 'create'){
      getProduct(+router.query.id)

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
          onSubmit={handleSubmit(handleCreateProduct)}
        >
          <Heading size="lg" fontWeight="normal">Formulário produto</Heading>

          <Divider my="4" borderColor="gray.700" />

          <VStack spacing="1">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Descrição</FormLabel>
                <Input
                  value={description}
                  name="description"
                  onChange={event => setDescription(event.target.value)}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Valor Unitário</FormLabel>
                <Input
                  value={unitValue}
                  name="unitValue"
                  onChange={event => setUnitValue(event.target.value)}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Unidade de Medida</FormLabel>
                <Input
                  value={unitOfMeasurement}
                  name="unitOfMeasurement"
                  onChange={event => setUnitOfMeasurement(event.target.value)}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Status</FormLabel>
                <select
                  style={{backgroundColor: '#f2f2f2', border: '1px solid #ccc', padding: '5px', fontSize: '13px', width: '100%'}}
                  name="statusProduct"
                  value={statusProduct}
                  onChange={event => setStatusProduct(event.target.value)}
                >
                  <option value=''>Selecione</option>
                  <option value='active'>Ativo</option>
                  <option value='inactive'>Inativo</option>
                  <option value='in construction'>Em construção</option>
                </select>
              </Box>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/products" passHref>
                <Button colorScheme="red"  color="white">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
