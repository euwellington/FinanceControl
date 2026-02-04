import type { ILogin } from "@/interfaces/ILogin";
import type { IResponse } from "@/interfaces/IResponse";
import api from "@/services/main/api";
import md5 from "md5";

class AuthAPI {
  login = ({ password, ...request }: ILogin) =>
    api.post<IResponse>("/auth/login", {
      ...request,
      password: md5(password),
    });
}

export default new AuthAPI();
