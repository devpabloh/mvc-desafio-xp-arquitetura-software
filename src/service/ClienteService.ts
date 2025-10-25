import { Client } from "../models/Client.js";
import { ClientRepository } from "../repository/ClientRepository.js";

export class ClientService{
  private clientRepository: ClientRepository

  constructor(clientRepository:ClientRepository){
    this.clientRepository = clientRepository;
  }

  public async createClient(data: Omit<Client, 'id'>): Promise<Client>{
    if(!data.email){
      throw new Error('E-mail é obrigatório.')
    }

    return this.clientRepository.create(data)
  }

  public async findAll():Promise<Client[]>{
    return this.clientRepository.findAll()
  }

  public async findById(id:number):Promise<Client | null>{
    return this.clientRepository.findById(id)
  }

  public async findByName(name: string): Promise<Client[]>{
    return this.clientRepository.findByName(name)
  }

  public async countClients(): Promise<number>{
    return this.clientRepository.count()
  }

  public async updatedClient(id: number, data: Partial<Omit<Client,"id">>): Promise<Client | null>{
    return this.clientRepository.update(id,data)
  }
}