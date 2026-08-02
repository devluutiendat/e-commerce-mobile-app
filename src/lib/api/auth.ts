import type {
  Auth,
  AuthTokens,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from "@/types";
import { api } from "./client";

export const authApi = {
  register: (dto: RegisterDto) =>
    api.post<Auth>("/auth/register", dto).then((r) => r.data),

  login: (dto: LoginDto) =>
    api.post<Auth>("/auth/login", dto).then((r) => r.data),

  refresh: (dto: RefreshTokenDto) =>
    api.post<AuthTokens>("/auth/refresh", dto).then((r) => r.data),

  logout: () => api.post<void>("/auth/logout").then((r) => r.data),
};
