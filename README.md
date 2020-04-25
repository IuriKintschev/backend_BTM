# Behind The Masks

O intuito deste projeto backend, e testar as novas features do prisma2 em conjunto com nexus.

O mais incrivel de uma aplicação em Graphql, é sua documentação automatica. Com o Nexus-prisma, podemos adicionar descrições em campos e metodos quando estamos criando os models, e essas descrições aparecem na documentação na aba DOC quando ergue o servidor.<br> O Nexus com prisma, você não precisa separar os types e resolvers, você constroe eles juntos, essa é a magica do Nexus e prisma. Com acesso simples ao banco, e de forma extremamente intuitiva e dinâmica de se realizar consultas com o prisma, e sintaxe limpa, e legivel por qualquer pessoa os modelos feitos com Nexus junto ao prisma client.

Esta aplicação possue fundamentos dos exemplos no repositorio do prisma!

## Overview

No final essa api deverá realizar o cadastro de usuarios e autenticação. Deve realizar postagens e seguir <br> outros usuarios para receber os posts no Feed. Deve ser possivel tabem procurar por postagens.

## Tecnologias usadas

* @prisma/cli
* @prisma/client
* graphql-yoga
* bcryptjs
* graphql-shield
* graphql
* nexus
* nexus-prisma
* Typescript


### Como executar ?

Realize um clone do projeto, ou baixe o arquivo .zip... <br> Sete seu banco de dados no arquivo .env na pasta do prisma (estou usando o sqlite).

> Instale as dependências
```
yarn install
```
> Rode as migrações no banco
```
npx prisma migrate up --experimental
```
> Após rode o servidor em modo de desenvolvimento
```
yarn run dev
```


## Obs!

> Ao instalar as dependências do projeto ele automaticamente ira gerar <br> os arquivos e schema do Nexus e Graphql. Caso não gerar rode o comando..
```
yarn run generate
```
