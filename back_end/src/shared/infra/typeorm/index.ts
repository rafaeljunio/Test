import 'reflect-metadata'
import 'dotenv/config'
import { env } from 'process'
import { Connection, createConnection } from 'typeorm'

export default async (): Promise<Connection> => {
  const conn = createConnection({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: +env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [
      'dist/src/modules/**/entities/*{.ts,.js}',
      'src/modules/**/entities/*.ts',
      'dist/src/shared/**/entities/*{.ts,.js}',
      'src/shared/**/entities/*.ts'
    ],
    synchronize: false,
    extra: {
      requestTimeout: 300000,
      trustServerCertificate: true
    },
    logging: false
  })

  return await conn
}
