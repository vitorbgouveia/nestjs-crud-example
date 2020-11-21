<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
nestJS-crud-example
=========================
* Projeto exemplo para construção de um microsserviço em nestJS com abstract CRUD, autenticação e outros recursos já adicionados!

 Lista de funcionalidades:

 * @Route("api/exemplo")     -> Retorna lista de exemplos (GET);
 * @Route("api/exemplo/id")  -> Busca uma exemplo (GET);
 * @Route("api/exemplo/bulk")-> Cadastra uma ou mais exemplos (POST);
 * @Route("api/exemplo/id")  -> Sobescreve um exemplo (PATCH);
 * @Route("api/exemplo/id")  -> Altera um exemplo (PUT);
 * @Route("api/exemplo/id")  -> Exclui um exemplo (DELETE);

 ## 🛠️ Construído com
* [NestJS](https://nestjs.com/) - Framework 
* [TypeScript](https://www.typescriptlang.org/) - Linguagem
* [VsCode](https://code.visualstudio.com/) - IDE Code
* [TypeORM](https://typeorm.io/#/) - Gerenciador de entidades

## 📖 Sumário
* [Pré-requisitos](#Pré-requisitos)
* [Instalando](#Instalando)
* [Migrations](#Migrations)
* [Docker](#Docker)
* [Tests](#Tests)
* [Estrutura de código](#Padronização-de-codigo)

# 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

# 📋 Pré-requisitos

* docker
* docker-compose
* npm
* commitizen
* git
* VSCode

# 🔧 Instalando

Clonar o repositório
```
git clone https://github.com/vitorbgouveia/nestjs-crud-example.git
```

```
npm i
```

Executar comando:
```
npm i --global commitizen
```

Gerar first release:
```
npm run release -- --first-release
```

# 🗄️ Migrations

É uma forma de versionar o schema de sua aplicação. Migrations trabalha na manipulação da base de dados: criando, alterando ou removendo. Uma forma de controlar as alterações do seu banco juntamente com o versionamento de sua aplicação e compartilhar-la.

Gerando novo arquivo de migrations:
```
npm run migration:generate -- -n "nome do arquivo"
```

Executando migrations:
```
npm run migration:run
```

Revertendo migrations:
```
npm run migration:revert
```

# 📦 Docker

Docker é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres.
 Os contêineres são isolados uns dos outros e agrupam seus próprios softwares, bibliotecas e arquivos de configuração.

Levantar container `docker-compose up`

Abrir no navegador `http://localhost:3000`

Swagger no navegador `http://localhost:3000/api-docs/`


Para levantar o container (desenvolvimento):
```
docker-compose up -d --b
```

Para levantar o container (homologação):
```
docker-compose -f ./docker-compose.homo.yaml up -d --b
```

Para levantar o container (produção):
```
docker-compose -f ./docker-compose.prod.yaml up -d --b
```

# 🔩 Tests

O teste de APIs é um tipo de teste de software focado em determinar se as APIs desenvolvidas vão de encontro às expectativas relativamente à funcionalidade, confiabilidade, performance e segurança da aplicação.

Ao executar o comando npm run test a aplicação irá buscar todos os arquivos que possuem o sufixo .spec.ts e executá-los.

Ao executar o comando npm run test:e2e a aplicação irá buscar todos os arquivos que possuem o sufixo .e2e-spec.ts.ts e executá-los.

Os arquivos com sufixo .spect.ts por padrão são arquivos de testes unitários.

Os arquivos com sufixo .e2e-spect.ts por padrão são arquivos de testes de funcionalidade.

Para executar testes unitários:
```
npm run test
```

Para executar testes unitários com relatório de cobertura de código:
```
npm run test:cov
```

Para executar testes de funcionalidade:
```
npm run test:e2e
```

# Estrutura de código

```
|   |-- migrations
|   |-- src
|   |   |-- application
|   |   |   |-- exemplo
|   |   |   |   |-- controller
|   |   |   |   |   -- exemplo-controller.controller.ts
|   |   |   |   |-- service
|   |   |   |   |   -- exemplo.service.ts
|   |   |   |   -- exemplo.module.ts
|   |   |   -- application.module.ts
|   |   |-- domain
|   |   |   |-- dto
|   |   |   |   -- form-exemplo.dto.ts
|   |   |   |-- entity
|   |   |   |   -- abstract.entity.ts
|   |   |   |   -- exemplo.entity.ts
|   |   |-- infrastructure
|   |   |   |-- pipeline
|   |   |   |   |-- pipes.ts
|   |   |   |   |   -- valida-permissoes.pipeline.ts
|   |   |   |   |   -- valida-token.pipeline.ts
|   |   |   |   |   -- valida-usuario.pipeline.ts
|   |   |   |   -- pipeline.ts
|   |   |   |-- services
|   |   |   |   -- auth.service.ts
|   |   |   |   -- crud.service.ts
|   |   |   |   -- shared.service.ts
|   |   |   -- crudEnums.ts
|   |   |   -- gerenciador-identidade.ts
|   |   |   -- http-exception.filter.ts
|   |   |-- test
|   |   |   -- app.e2e.spec.ts  
|   |   |   -- TesteUtil.ts
|   |   -- app.controller.ts
|   |   -- app.module.ts
|   |   -- auth.guard.ts
|   |   -- main.ts
|-- .env-example
|-- .eslintrc.js
|-- .gitignore
|-- .prettierrc
|-- .sequelizerc
|-- commitlint.config.js
|-- config.json
|-- docker-compose.homo.yaml
|-- docker-compose.prod.yaml
|-- docker-compose.yaml
|-- Dockerfile
|-- Jenkinsfile
|-- LICENSE
|-- nest-cli.json
|-- ormconfig.json
|-- package.json
|-- README.md
|-- tsconfig.build.json
|-- tsconfig.json
|-- tslint.json
```
