import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardService } from '../services/BoardService';
import { JwtGuard } from 'src/security/JwtGuard';
import { BoardByIdPipe } from '../pipes/BoardByIdPipe';
import { CreateBoardDTO } from '../dtos/CreateBoardDTO';
import { BoardRolesGuard } from 'src/security/boardRoles/BoardRolesGuard';
import { BoardRoles } from 'src/utils/decorators/BoardRoles';
import { BoardRole } from '@prisma/client';

@Controller('/boards')
export class BoardController {
  constructor (
    private boardService: BoardService,
  ) {}

  @UseGuards(JwtGuard, BoardRolesGuard)
  @Get('/:boardId')
  async getBoardById (
    @Param('boardId', BoardByIdPipe) boardId: string,
  ) {
    return this.boardService.getById(boardId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createBoard (
    @Request() req,
    @Body() body: CreateBoardDTO,
  ) {
    return this.boardService.create(req.user.id, body);
  }

  @BoardRoles(BoardRole.ADMIN)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Patch('/:boardId')
  async updateBoardById (
    @Body() body: CreateBoardDTO,
    @Param('boardId', BoardByIdPipe) boardId: string,
  ) {
    return this.boardService.updateById(boardId, body);
  }

  @BoardRoles(BoardRole.ADMIN)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Delete('/:boardId')
  async deleteBoardById (
    @Param('boardId', BoardByIdPipe) boardId: string,
  ) {
    return this.boardService.deleteById(boardId);
  }

  @UseGuards(JwtGuard, BoardRolesGuard)
  @Get('/:boardId/lists')
  async getBoardLists (
    @Param('boardId', BoardByIdPipe) boardId: string,
  ) {
    return this.boardService.getBoardLists(boardId);
  }

  @UseGuards(JwtGuard, BoardRolesGuard)
  @Get('/:boardId/tasks')
  async getBoardTasks (
    @Param('boardId', BoardByIdPipe) boardId: string,
  ) {
    return this.boardService.getBoardTasks(boardId);
  }
}