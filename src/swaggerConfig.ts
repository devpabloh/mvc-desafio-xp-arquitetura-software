import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Clientes (Desafio Arquiteto)',
    version: '1.0.0',
    description: 'API RESTful para CRUD de Clientes, seguindo o padrão MVC.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  
  components: {
    schemas: {
      Cliente: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          name: {
            type: 'string',
            example: 'Pablo',
          },
          email: {
            type: 'string',
            example: 'pablo@email.com',
          },
          phone: {
            type: 'string',
            example: '11999999999',
          },
        },
      },
      ClienteInput: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Novo Cliente',
          },
          email: {
            type: 'string',
            example: 'novo@email.com',
          },
          phone: {
            type: 'string',
            example: '11999999999',
          },
        },
        required: ['name', 'email'],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/controller/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);