import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { LocalGuard } from 'src/security/LocalGuard';
import { RegistrationDTO } from '../dtos/RegistrationDTO';
import { UserByIdPipe } from '../pipes/UserByIdPipe';

@Controller('/auth')
export class AuthController {

  constructor (
    private authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  async login (
    @Request() req,
  ) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register (
    @Body() body: RegistrationDTO,
  ) {
    return this.authService.register(body);
  }

  @Post('/verifyEmail/:userId')
  async verifyEmail (
    @Param('userId', UserByIdPipe) userId: string,
  ) {
    return this.authService.verifyEmail(userId);
  }
}