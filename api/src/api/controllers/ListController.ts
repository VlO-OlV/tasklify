import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ListService } from "../services/ListService";
import { CreateListDTO } from "../dtos/CreateListDTO";
import { UpdateListDTO } from "../dtos/UpdateListDTO";

@Controller('/lists')
export class ListController {

    constructor (
        private listService: ListService,
    ) {}

    @Post()
    async createList (
        @Body() body: CreateListDTO,
    ) {
        const createdList = await this.listService.create(body);
        return createdList;
    }

    @Patch('/:id')
    async updateListById (
        @Param('id') id: string,
        @Body() body: UpdateListDTO,
    ) {
        const updatedList = await this.listService.updateById(id, body);
        return updatedList;
    }

    @Delete('/:id')
    async deleteListById (
        @Param('id') id: string,
    ) {
        const deletedList = await this.listService.deleteById(id);
        return deletedList;
    }

    @Get('/:id')
    async getListById (
        @Param('id') id: string,
    ) {
        const list = await this.listService.getById(id);
        return list;
    }

    @Get()
    async getAllLists () {
        const lists = await this.listService.getAll();
        return lists;
    }
}