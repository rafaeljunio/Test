import 'reflect-metadata'
import cors from 'cors'
import 'module-alias/register'
import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'

import 'express-async-errors'

import { AppError } from '@shared/errors/AppError'
import createConnection from '@shared/infra/typeorm'

import '@shared/container'

import { router } from './routes'

dotenv.config()

createConnection()

const app = express()

app.disable('x-powered-by')

app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ limit: '500mb', extended: true }))

app.use(cors())

app.use(express.json())

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      })
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`
    })
  }
)

export { app }
