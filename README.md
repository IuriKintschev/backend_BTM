# Behind The Masks

### Api graphql em produção!

O intuito deste projeto backend, e testar as novas features do prisma2 em conjunto com nexus.

Esta aplicação possue fundamento dos exemplos do prisma!

## Overview

No final essa api devera realizar o cadastro de usuarios e autenticação. Deve realizar postagens e seguir outros usuarios para receber os posts no Feed. Deve ser possivel tabem procurar por postagens e usuarios.

## Tecnologias atuais

* @prisma/cli
* @prisma/client
* graphql-yoga
* Typescript
* bcryptjs
* graphql-shield
* nexus


### Como executar ?

Realize um clone do projeto, ou baixe o arquivo .zip...

Sete seu banco de dados no arquivo .env na pasta do prisma (estou usando o sqlite).

> Instale as dependencias
```
yarn install
```
> Rode as migracoes no banco
```
npx prisma migrate up --experimental
```
> Apos rode o servidor em modo de desenvolvimento
```
yarn run dev
```
