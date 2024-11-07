import { Module } from '@nestjs/common';
import { BoardController } from 'src/api/controllers/BoardController';
import { BoardService } from 'src/api/services/BoardService';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}