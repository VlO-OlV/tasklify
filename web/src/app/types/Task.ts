import { Priority } from "../enums/PriorityEnum";

export interface Task {
    id: string,
    name: string,
    description: string,
    deadline: Date,
    listId: string,
    priority: Priority,
    createdAt: Date,
}

export interface CreateTask {
    name: string,
    description: string,
    deadline: Date,
    listId: string,
    priority: Priority,
    createdAt: Date,
}