import { User } from "./User";

export interface LoginResponse {
  jwtToken: string;
  user: User;
}