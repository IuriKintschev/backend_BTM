# Behind The Masks

O intuito deste projeto backend, e testar as novas features do prisma2 em conjunto com nexus.

O mais incrivel de uma aplicação em Graphql, é sua documentação automatica. Com o Nexus-prisma, podemos adicionar descricoes em campos e metodos quando estamos criando os models, e essa descrição aparecem na documentação na aba DOC quando ergue o servidor.<br> O Nexus com prisma, voçe nao precisa separar os types e resolvers, vc constroe eles juntos, essa é a magica do Nexus e prisma. Com acesso simples ao banco, e de forma estremamente intuitiva e dinamica de se realizar consultas com o prisma, e sintaxe limpa, e legivel por qualquer um os modelos feitos com Nexus junto ao prisma client.

Esta aplicação possue fundamento dos exemplos no repositorio do prisma!

## Overview

No final essa api devera realizar o cadastro de usuarios e autenticação. Deve realizar postagens e seguir <br> outros usuarios para receber os posts no Feed. Deve ser possivel tabem procurar por postagens.

## Tecnologias atuais

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


## Obs!

> Ao intalar as dependencias do projeto ele automaticamente ira gerar <br> os arquivos e schema do Nexus e Graphql. Caso nao gere rode o comando..
```
yarn run generate
```