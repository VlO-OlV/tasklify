export interface User {
  id: string,
  email: string,
  username?: string,
  firstName: string,
  lastName: string,
  isVerified: boolean,
  createdAt: Date,
  updatedAt: Date,
}