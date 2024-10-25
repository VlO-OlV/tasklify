export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterBody extends LoginBody {
  firstName: string;
  lastName: string;
}