import { Priority } from '../enums/PriorityEnum';

export const formatPriority = (priority: Priority) => {
  return `${priority[0]}${priority.slice(1).toLowerCase()}`;
}