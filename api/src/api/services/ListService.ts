import { Injectable } from "@nestjs/common";
import { ListRepository } from "../database/repositories/ListRepository";
import { Prisma } from "@prisma/client";
import { ListIsNotEmptyException } from 'src/utils/exceptions/ListIsNotEmptyException';

@Injectable()
export class ListService {

  constructor (
    private listRepository: ListRepository,
  ) {}

  async create (data: Prisma.ListUncheckedCreateInput) {
    const createdList = await this.listRepository.create(data);
    return createdList;
  }

  async updateById (id: string, data: Prisma.ListUncheckedUpdateInput) {
    const updatedList = await this.listRepository.updateById(id, data);
    return updatedList;
  }

  async deleteById (id: string) {
    const listToDelete = await this.listRepository.findById(id);
    if (listToDelete.tasks.length !== 0) {
      throw new ListIsNotEmptyException();
    }
    const deletedList = await this.listRepository.deleteById(id);
    return deletedList;
  }

  async getById (id: string) {
    const list = await this.listRepository.findById(id);
    return list;
  }
}