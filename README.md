### Instruções

#### Requisitos
* Node v16.18.1
* Banco de dados Postgres

Instalação do banco usando o docker

rode o comando:

```
  docker pull postgres
  docker run --name database -e POSTGRES_PASSWORD=102030 -p 5432:5432 -d postgres
```
No arquivo database.sql está o SQL para gerar as tabelas utilizadas pela aplicação.

#### Backend

Backend desenvolvido utilizando:

* NodeJs
* Express
* TypeORM

Link da documentação da API: https://documenter.getpostman.com/view/2756818/2s93JxsMTe

Foi utilizado a arquitetura baseada em módulos:

```
.
├── node_modules
├── public
├── src
│   ├── config
│   ├── modules
│   │   ├── module1
│   │   │   ├── dtos
│   │   │   ├── infra
│   │   │   ├── repositories
│   │   │   └── useCases
│   │   ├── module2
│   │   ├── module3
│   │   └── ...
│   ├── shared
│   │   ├── container
│   │   ├── errors
│   │   └── infra
│   │       └─ http
│   │           ├── midlewares
│   │           ├── routes   // diretório com as rotas da aplicação
│   │           │── app.js
│   │           └── server.js // arquivo inicial da aplicação
│   └── utils
├── .env
├── .gitignore
├── package.json
└── README.md
```



Na pasta raiz do backend rode o comando

```
  npm install
  npm run dev
```
ou

```
  yarn
  yarn dev
```

#### Frontend

Frontend desenvolvido utilizando:

* React
* NextJs
* ChakraUI

Na pasta raiz do frontend rode o comando

```
  npm install
  npm run dev
```
ou

```
  yarn
  yarn dev
```
#### Usuário teste

email: admin@email.com
password: P@ssw0rd_
