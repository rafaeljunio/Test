import { app } from './app'

const server = app
  .listen(3333, () => {
    console.log('Server is running on port 3333.')
  })
  .on('error', () => {
  })

server.timeout = 300000
