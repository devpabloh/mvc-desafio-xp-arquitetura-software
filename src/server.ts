import express from 'express';
import swaggerUi from 'swagger-ui-express'; 
import { swaggerSpec } from './swaggerConfig.js';

// Importando as peças do MVC
import { ClientRepository } from './repository/ClientRepository.js';
import { ClientService } from './service/ClienteService.js';
import { ClientController } from './controller/ClienteController.js';

class ApiApplication {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares(); 
    this.setupRoutes();
    this.setupSwagger();
  }

  private setupMiddlewares() {
    this.app.use(express.json());
    console.log('Middlewares configurados.');
  }

  private setupRoutes() {
    
    const clienteRepository = new ClientRepository();

    const clienteService = new ClientService(clienteRepository);

    const clienteController = new ClientController(clienteService);

    this.app.use('/clientes', clienteController.router);
    console.log('Rotas MVC configuradas.');
  }

  private setupSwagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI disponível em /api-docs');
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
}

const port = 3000;
const application = new ApiApplication();
application.start(port);