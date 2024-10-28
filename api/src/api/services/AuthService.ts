import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../database/repositories/UserRepository';
import { NotRegisteredException } from 'src/utils/exceptions/NotRegisteredException';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDTO } from '../dtos/RegistrationDTO';
import { AlreadyRegisteredException } from 'src/utils/exceptions/AlreadyRegisteredException';
import { EmailService } from './EmailService';
import { NotVerifiedException } from 'src/utils/exceptions/NotVerifiedException';

@Injectable()
export class AuthService {

  constructor (
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private async checkPassword (password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser (email: string, password: string) {
    const user = await this.userRepository.find({ email });
    if (!user) {
      throw new NotRegisteredException('email');
    }
    if (!user.isVerified) {
      throw new NotVerifiedException();
    }
    const isCorrectPassword = await this.checkPassword(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const { password: userPassWord, ...result } = user;
    return result;
  }
  
  async login (user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register (body: RegistrationDTO) {
    const user = await this.userRepository.find({ email: body.email });
    if (user) {
      throw new AlreadyRegisteredException();
    }
    const newUser = await this.userRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, await bcrypt.genSalt()),
    });
    await this.requestEmailVerification(body.email);
  }

  async requestEmailVerification (email: string) {
    const userToVerify = await this.userRepository.find({ email });
    await this.emailService.sendEmail({
      to: email,
      subject: 'Email verification',
      message: 'Verify your email, please :)',
    });
  }

  async verifyEmail (userId: string) {
    return this.userRepository.updateById(userId, {
      isVerified: true,
    });
  }

  async getMe (userId: string) {
    const { password, ...user } = await this.userRepository.find({ id: userId });
    return user;
  }
}