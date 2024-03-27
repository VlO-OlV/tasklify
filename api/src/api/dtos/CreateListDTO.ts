import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateListDTO {
    @MinLength(3, {message: 'The name is too short. It must have at least 3 characters'})
    @MaxLength(20, {message: 'The name is too long. It must have not more than 20 characters'})
    @IsNotEmpty({message: 'List name cannot be empty'})
    name: string;
}