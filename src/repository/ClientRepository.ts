import {PrismaClient} from '@prisma/client'
import type { Client } from "../models/Client.js";
import {prisma} from '../lib/prisma.js'

export class clientRepository{
    private prisma: PrismaClient

    constructor(){
      this.prisma = prisma
    }

    public async create(data: Omit<Client,'id'>): Promise<Client>{
      return this.prisma.client.create({data})
    }

    public async findAll(): Promise<Client[]>{
      return this.prisma.client.findMany()
    }

    public async findById(id:number): Promise<Client | null>{
      return this.prisma.client.findUnique({where: {id}})
    }

    public async findByName(name: string): Promise<Client[]>{
      return this.prisma.client.findMany({where: {name: {contains: name}}})
    }

    public async count(): Promise<number>{
      return this.prisma.client.count()
    }

    public async update(id: number, data: Partial<Omit<Client,'id'>>):Promise<Client | null>{
      return this.prisma.client.update({
        where: {id},
        data,
      })
    }

    public async delete(id:number): Promise<void>{
      await this.prisma.client.delete({where: {id}})
    }
}