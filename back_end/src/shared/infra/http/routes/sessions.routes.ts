import { Router } from 'express'

import { CreateSessionUserController } from '@modules/accounts/useCases/createSessionUser/CreateSessionUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const sessionsRoutes = Router()

const createSessionUserController = new CreateSessionUserController()

sessionsRoutes.post('/', createSessionUserController.handle)

sessionsRoutes.get('/me', ensureAuthenticated, (request, response) => {
  const user = request.user

  return response.json({
    user
  })
})

export { sessionsRoutes }
