module.exports = {
  "type": "mssql",
  "port": parseInt(process.env.DATABASE_PORT),
  "host": process.env.DATABASE_HOST || 'localhost',
  "username": process.env.DATABASE_USER,
  "password": process.env.DATABASE_PASSWORD,
  "database": process.env.DATABASE_NAME,
  "entities": [
    "dist/src/modules/**/entities/**/*{.ts,.js}",
    "src/modules/**/entities/**/*.ts",
  ],
  "extra": {
    "trustServerCertificate": true
  }
}
