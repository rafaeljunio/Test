import { Router } from 'express'

import { UpdateClientController } from '@modules/client/useCases/updateClient/UpdateClientController'
import { CreateClientController } from '@modules/client/useCases/createClient/CreateClientController'
import { GetClientController } from '@modules/client/useCases/getClient/GetClientController'
import { DeleteClientController } from '@modules/client/useCases/deleteClient/DeleteClientController'
import { ListClientController } from '@modules/client/useCases/listClient/ListClientController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const clientsRoutes = Router()

const createClientController = new CreateClientController()
const updateClientController = new UpdateClientController()
const getClientController = new GetClientController()
const deleteClientController = new DeleteClientController()
const listClientController = new ListClientController()

clientsRoutes.post('/', ensureAuthenticated, createClientController.handle)
clientsRoutes.post('/list', ensureAuthenticated, listClientController.handle)
clientsRoutes.put('/:id', ensureAuthenticated, updateClientController.handle)
clientsRoutes.get('/:id', ensureAuthenticated, getClientController.handle)
clientsRoutes.delete('/:id', ensureAuthenticated, deleteClientController.handle)

export { clientsRoutes }
