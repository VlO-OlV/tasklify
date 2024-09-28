import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDTO {
  @IsString({message: 'First name must be a string'})
  @IsNotEmpty({message: 'First name cannot be empty'})
    firstName: string;

  @IsString({message: 'Last name must be a string'})
  @IsNotEmpty({message: 'Last name cannot be empty'})
    lastName: string;

  @IsEmail({}, {message: 'Incorrect email'})
  @IsNotEmpty({message: 'Email cannot be empty'})
    email: string;

  @IsString({message: 'Password must be a string'})
  @MinLength(8, {message: 'Too short password'})
    password: string;
}