import { Injectable } from "@nestjs/common";
import { ListRepository } from "../database/repositories/ListRepository";
import { Prisma } from "@prisma/client";

@Injectable()
export class ListService {

    constructor (
        private listRepository: ListRepository,
    ) {}

    async create (
        data: Prisma.ListUncheckedCreateInput,
    ) {
        const createdList = await this.listRepository.create(data);
        return createdList;
    }

    async updateById (
        id: string,
        data: Prisma.ListUncheckedUpdateInput,
    ) {
        const updatedList = await this.listRepository.updateById(id, data);
        return updatedList;
    }

    async deleteById (
        id: string,
    ) {
        const deletedList = await this.listRepository.deleteById(id);
        return deletedList;
    }

    async getById (
        id: string,
    ) {
        const list = await this.listRepository.findById(id);
        return list;
    }

    async getAll () {
        const lists = await this.listRepository.findAll();
        return lists;
    }
}