import type {Request, Response} from 'express'
import {Router} from 'express' 
import { ClientService } from '../service/ClienteService.js'

export class ClientController{
  public router: Router
  private clientService: ClientService

  constructor(clientService: ClientService){
    this.router = Router()
    this.clientService = clientService
    this.initializeRoutes()
  }
  initializeRoutes() {
    /**
     * @swagger
     * /clientes:
     *   get:
     *     summary: Retorna todos os clientes
     *     tags: [Clientes]
     *     responses:
     *       200:
     *         description: Lista de clientes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Cliente'
     */
    // Find All [cite: 115-117]
    this.router.get('/', async (req: Request, res: Response) => {
      // 1. Pede ao Service
      const clientes = await this.clientService.findAll();
      // 2. Retorna a Resposta (View JSON)
      res.status(200).json(clientes);
    });

    /**
     * @swagger
     * /clientes/contar:
     *   get:
     *     summary: Retorna o número total de clientes
     *     tags: [Clientes]
     *     responses:
     *       200:
     *         description: Contagem total
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 count:
     *                   type: integer
     *                   example: 10
     */
    // Count [cite: 128-130]
    this.router.get('/contar', async (req: Request, res: Response) => {
      const contagem = await this.clientService.countClients();
      res.status(200).json({ count: contagem });
    });

    /**
     * @swagger
     * /clientes/nome/{nome}:
     *   get:
     *     summary: Retorna clientes por nome
     *     tags: [Clientes]
     *     parameters:
     *       - in: path
     *         name: nome
     *         schema:
     *           type: string
     *         required: true
     *         description: Nome (ou parte) do cliente
     *     responses:
     *       200:
     *         description: Lista de clientes encontrados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Cliente'
     */
    // Find By Name [cite: 125-127]
    this.router.get('/nome/:nome', async (req: Request, res: Response) => {
      const { nome } = req.params;
      const clientes = await this.clientService.findByName(nome);
      res.status(200).json(clientes);
    });

    /**
     * @swagger
     * /clientes/{id}:
     * get:
     * summary: Retorna um cliente específico pelo ID
     * tags: [Clientes]
     * parameters:
     * - in: path
     * name: id
     * schema:
     * type: integer
     * required: true
     * description: ID do cliente
     * responses:
     * 200:
     * description: Cliente encontrado
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/Cliente'
     * 404:
     * description: Cliente não encontrado
     */
    // Find By ID [cite: 118-124]
    this.router.get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const cliente = await this.clientService.findById(Number(id));

      if (cliente) {
        res.status(200).json(cliente);
      } else {
        // Equivalente ao ResponseEntity.notFound().build() [cite: 122]
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    });

    /**
     * @swagger
     * /clientes:
     * post:
     * summary: Cria um novo cliente
     * tags: [Clientes]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/ClienteInput'
     * responses:
     * 201:
     * description: Cliente criado com sucesso
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/Cliente'
     */
    // Create [cite: 131-133]
    this.router.post('/', async (req: Request, res: Response) => {
      // O `req.body` contém o JSON enviado pelo usuário
      const { name, email } = req.body;
      try {
        const novoCliente = await this.clientService.createClient({ name, email });
        res.status(201).json(novoCliente); // 201 = Created
      } catch (error) {
        res.status(400).json({ message: (error as Error).message }); // 400 = Bad Request
      }
    });

    /**
     * @swagger
     * /clientes/{id}:
     * put:
     * summary: Atualiza um cliente existente
     * tags: [Clientes]
     * parameters:
     * - in: path
     * name: id
     * schema:
     * type: integer
     * required: true
     * description: ID do cliente
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/ClienteInput'
     * responses:
     * 200:
     * description: Cliente atualizado
     * content:
     * application/json:
     * schema:
     * $ref: '#/components/schemas/Cliente'
     * 404:
     * description: Cliente não encontrado
     */
    // UPDATE (Completando o CRUD [cite: 29])
    this.router.put('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, email } = req.body;
      const cliente = await this.clientService.updatedClient(Number(id), { name, email });
      if (cliente) {
        res.status(200).json(cliente);
      } else {
        res.status(404).json({ message: 'Cliente não encontrado' });
      }
    });

    /**
     * @swagger
     * /clientes/{id}:
     * delete:
     * summary: Deleta um cliente pelo ID
     * tags: [Clientes]
     * parameters:
     * - in: path
     * name: id
     * schema:
     * type: integer
     * required: true
     * description: ID do cliente
     * responses:
     * 204:
     * description: Cliente deletado (No Content)
     * 404:
     * description: Cliente não encontrado
     */
    // Delete [cite: 134-136]
    this.router.delete('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      await this.clientService.deletarCliente(Number(id))
      res.status(204).send(); 
    });
  }
}