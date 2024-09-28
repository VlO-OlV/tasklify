import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from '../database/repositories/UserRepository';
import { InvalidEtityIdException } from 'src/utils/exceptions/InvalidEntityIdException';

@Injectable()
export class UserByIdPipe implements PipeTransform {

  constructor (
    private userRepository: UserRepository,
  ) {}

  async transform (id: string) {
    const user = await this.userRepository.find({ id });
    if (!user) {
      throw new InvalidEtityIdException('User');
    }
    return id;
  }
}