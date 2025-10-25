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

desafio-final-api/
├── src/
│   ├── controller/
│   │   └── ClienteController.ts
│   ├── model/
│   │   └── Cliente.ts
│   ├── repository/
│   │   └── ClienteRepository.ts
│   ├── service/
│   │   └── ClienteService.ts
│   └── ApiApplication.ts  (Classe principal )
├── prisma/
│   └── schema.prisma
├── .env
├── .eslintrc.js
├── .prettierrc
├── package.json
└── tsconfig.json