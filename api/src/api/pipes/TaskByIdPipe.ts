import { Injectable, PipeTransform } from "@nestjs/common";
import { TaskRepository } from "../database/repositories/TaskRepository";
import { InvalidEtityIdException } from "src/utils/exceptions/InvalidEntityIdException";

@Injectable()
export class TaskByIdPipe implements PipeTransform {
    constructor (
        private taskRepository: TaskRepository,
    ) {}
    
    async transform(taskId: string) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new InvalidEtityIdException('Task');
        }
        return taskId;
    }
}