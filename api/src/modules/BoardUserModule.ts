import { Module } from '@nestjs/common';
import { BoardUserController } from 'src/api/controllers/BoardUserController';
import { BoardUserService } from 'src/api/services/BoardUserService';

@Module({
  controllers: [BoardUserController],
  providers: [BoardUserService],
})
export class BoardUserModule {}