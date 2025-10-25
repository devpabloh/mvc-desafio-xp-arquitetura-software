# Arquiteto de software

## Desafio Final

Você é um arquiteto de software em uma grande empresa de vendas on-line. Sendo responsável por construir e implementar uma solução que disponibilize publicamente dados de cliente, produto e pedido (algum domínio) aos parceiros da empresa.

Para isso você precisa projetar, documentar e implementar uma API REST, no padrão arquitetural MVC, que exponha um endpoint capaz de realizar C.R.U.D. dos dados.

## Arquitetura

MVC - Model, View e Controller.

## Linguagem / Framework

Typescript, Node e Express.

## Documentação

Swagger

## Padronização de código

1. Formatação do código: Prettier
2. Qualidade do código: EsLint

## Persistência de dados

SQLite

## Métodos / Endpoints

1. Contagem: Endpoint para retornar o número total de registros.
2. Find All: Endpoint para retornar todos os registros.
3. Find By ID: Endpoint para retornar um registro específico com base no ID.
4. Find By Name: Endpoint para retornar registros que correspondem a um nome específico.
5. C.R.U.D. : Endpoinst para criar(Create), ler(Read), atualizar(Update) e deletar (Delete).

## Desenho arquitetural do software

Draw.io - 

## Arquitetura de pastas e explicação dos componentes

desafio-api-mvc/
├── prisma/                 # Configuração do Prisma e migrações
│   └── schema.prisma       # Definição do nosso MODEL
├── src/                    # Nosso código-fonte
│   ├── controllers/        # CONTROLADORES: Recebem requisições HTTP 
│   │   └── ClienteController.ts
│   ├── services/           # SERVIÇOS: Contêm a Lógica de Negócios
│   │   └── ClienteService.ts
│   ├── repositories/       # REPOSITÓRIOS: Lidam com o acesso aos dados
│   │   └── ClienteRepository.ts 
│   ├── routes/             # Define as URLs (ex: /clientes)
│   │   └── index.ts
│   │   └── cliente.routes.ts
│   ├── config/             # Configurações (ex: Swagger)
│   │   └── swagger.ts
│   └── server.ts            # Arquivo principal que inicia o servidor
├── .eslintrc.json          # Configs do ESLint
├── .prettierrc.json        # Configs do Prettier
├── package.json
└── tsconfig.json