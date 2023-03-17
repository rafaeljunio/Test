import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, Select, FormLabel } from "@chakra-ui/react";
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import { Input } from "../../../components/Form/Input";

type SaveClientFormData = {
  name: string
  street: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  complement: string
  status: 'active' | 'inactive' | 'in construction'
}

const createClientFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
})

export default function CreateClient() {
  const { register, handleSubmit, formState, setValue } = useForm()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [complement, setComplement] = useState('');
  const [status, setStatus] = useState('');


  const {id} = router.query;

  const saveClient = async () => {
    const response = await api.post('/clients', {
      name,
      street,
      neighborhood,
      city,
      state,
      zip_code,
      complement,
      status
    })

  };

  const getClient = async (id: number) => {
    const res:any = await api.get(`/clients/${id}`)

    setName(res.data.name)
    setStreet(res.data.street)
    setNeighborhood(res.data.neighborhood)
    setCity(res.data.city)
    setState(res.data.state)
    setZip_code(res.data.zip_code)
    setComplement(res.data.complement)
    setStatus(res.data.status)
  };

  const editClient = async () => {
    const res = await api.put(`/clients/${id}`, {
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

  const { errors } = formState

  const handleCreateClient: SubmitHandler<SaveClientFormData> = async () => {
    if(isEditing){
      await editClient()
    }else{
      await saveClient()
    }
    router.push('/clients')
  }

  useEffect( () => {
    if(String(router.query.id) !== 'create'){
      getClient(+router.query.id)

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
          onSubmit={handleSubmit(handleCreateClient)}
        >
          <Heading size="lg" fontWeight="normal">Formulário cliente</Heading>

          <Divider my="4" borderColor="gray.700" />

          <VStack spacing="1">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Nome</FormLabel>
                <Input
                  value={name}
                  name="name"
                  onChange={event => setName(event.target.value)}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Rua</FormLabel>
                <Input
                  value={street}
                  name="street"
                  onChange={event => setStreet(event.target.value)}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Bairro</FormLabel>
                <Input
                  value={neighborhood}
                  name="neighborhood"
                  onChange={event => setNeighborhood(event.target.value)}
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
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Estado</FormLabel>
                <Input
                  value={state}
                  name="state"
                  onChange={event => setState(event.target.value)}
                />
              </Box>
              <Box>
                <FormLabel style={{fontSize: '13px'}}>CEP</FormLabel>
                <Input
                  value={zip_code}
                  name="zip_code"
                  onChange={event => setZip_code(event.target.value)}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Complemento</FormLabel>
                <Input
                  value={complement}
                  name="complement"
                  onChange={event => setComplement(event.target.value)}
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <FormLabel style={{fontSize: '13px'}}>Status</FormLabel>
                <select
                  style={{backgroundColor: '#f2f2f2', border: '1px solid #ccc', padding: '5px', fontSize: '13px', width: '100%'}}
                  name="status"
                  value={status}
                  onChange={event => setStatus(event.target.value)}
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
              <Link href="/clients" passHref>
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
