import { Priority } from "../enums/PriorityEnum";

export interface Task {
  id: string,
  name: string,
  description: string,
  deadline: Date,
  listId: string,
  priority: Priority,
  assigneeId?: string,
  createdAt: Date,
  updatedAt: Date,
}