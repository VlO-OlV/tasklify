import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ListService } from "../services/ListService";
import { CreateListDTO } from "../dtos/CreateListDTO";
import { UpdateListDTO } from "../dtos/UpdateListDTO";
import { ListByIdPipe } from "../pipes/ListByIdPipe";
import { JwtGuard } from 'src/security/JwtGuard';
import { BoardRoles } from 'src/utils/decorators/BoardRoles';
import { BoardRole } from '@prisma/client';
import { BoardRolesGuard } from 'src/security/boardRoles/BoardRolesGuard';

@Controller('/lists')
export class ListController {

  constructor (
    private listService: ListService,
  ) {}

  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Post()
  async createList (
    @Body() body: CreateListDTO,
  ) {
    const createdList = await this.listService.create(body);
    return createdList;
  }

  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Patch('/:listId')
  async updateListById (
    @Param('listId', ListByIdPipe) id: string,
    @Body() body: UpdateListDTO,
  ) {
    const updatedList = await this.listService.updateById(id, body);
    return updatedList;
  }

  @BoardRoles(BoardRole.ADMIN, BoardRole.MODERATOR)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Delete('/:listId')
  async deleteListById (
    @Param('listId', ListByIdPipe) id: string,
  ) {
    const deletedList = await this.listService.deleteById(id);
    return deletedList;
  }

  @UseGuards(JwtGuard, BoardRolesGuard)
  @Get('/:listId')
  async getListById (
    @Param('listId', ListByIdPipe) id: string,
  ) {
    const list = await this.listService.getById(id);
    return list;
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllLists () {
    const lists = await this.listService.getAll();
    return lists;
  }
}