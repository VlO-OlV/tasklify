import { Priorities } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsOptional, IsUUID, MaxLength, MinDate, MinLength } from "class-validator";

export class UpdateTaskDTO {
    @MinLength(3, {message: 'The name is too short. It must have at least 3 characters'})
    @MaxLength(20, {message: 'The name is too long. It must have not more than 20 characters'})
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @MinDate(new Date(), {message: 'Invalid date for he deadline'})
    @Type(() => Date)
    @IsOptional()
    deadline?: Date;

    @IsUUID(undefined, {message: 'List id should be UUID'})
    @IsNotEmpty({message: 'List id cannot be empty'})
    @IsOptional()
    listId?: string;

    @IsEnum(Priorities, {message: 'The priority must be a value from enum'})
    @IsOptional()
    priority?: Priorities;
}