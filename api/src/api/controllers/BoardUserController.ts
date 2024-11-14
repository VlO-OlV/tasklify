import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { BoardUserService } from '../services/BoardUserService';
import { JwtGuard } from 'src/security/JwtGuard';
import { BoardRoles } from 'src/utils/decorators/BoardRoles';
import { BoardRole } from '@prisma/client';
import { BoardRolesGuard } from 'src/security/boardRoles/BoardRolesGuard';
import { CreateBoardUserDTO } from '../dtos/CreateBoardUserDTO';
import { BoardUserByIdPipe } from '../pipes/BoardUserByIdPipe';
import { UpdateBoardUserDTO } from '../dtos/UpdateBoardUserDTO';

@Controller('/boardUsers')
export class BoardUserController {
  constructor (
    private boardUserService: BoardUserService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMyBoardUsers (
    @Request() req,
  ) {
    return this.boardUserService.getMy(req.user.id);
  }

  @BoardRoles(BoardRole.ADMIN)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Post()
  async createBoardUser (
    @Body() body: CreateBoardUserDTO,
  ) {
    return this.boardUserService.create(body);
  }

  @BoardRoles(BoardRole.ADMIN)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Patch('/:boardUserId')
  async updateBoardUser (
    @Param('boardUserId', BoardUserByIdPipe) boardUserId: string,
    @Body() body: UpdateBoardUserDTO,
  ) {
    return this.boardUserService.updateById(boardUserId, body);
  }

  @BoardRoles(BoardRole.ADMIN)
  @UseGuards(JwtGuard, BoardRolesGuard)
  @Delete('/:boardUserId')
  async deleteBoardUser (
    @Param('boardUserId', BoardUserByIdPipe) boardUserId: string,
  ) {
    return this.boardUserService.deleteById(boardUserId);
  }
}