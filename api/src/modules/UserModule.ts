import { Module } from '@nestjs/common';
import { UserService } from 'src/api/services/UserService';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}