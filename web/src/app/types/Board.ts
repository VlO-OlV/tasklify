import { BoardUser } from './BoardUser';

export interface Board {
  id: string,
  name: string,
  boardUsers: BoardUser[],
  createdAt: Date,
  updatedAt: Date,
}