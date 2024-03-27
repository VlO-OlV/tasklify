import { Priorities } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateTaskDTO {
    @MinLength(3, {message: 'The name is too short. It must have at least 3 characters'})
    @MaxLength(20, {message: 'The name is too long. It must have not more than 20 characters'})
    @IsNotEmpty({message: 'Task name cannot be empty'})
    name: string;

    @IsOptional()
    description?: string;

    @MinDate(new Date(), {message: 'Invalid date for he deadline'})
    @IsOptional()
    deadline?: Date;

    @IsUUID(undefined, {message: 'List id should be UUID'})
    @IsNotEmpty({message: 'List id cannot be empty'})
    listId: string;

    @IsEnum(Priorities, {message: 'The priority must be a value from enum'})
    priority: Priorities;
}