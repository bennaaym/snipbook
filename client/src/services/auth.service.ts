import apiClient from "../api/apiClient";

export interface ISignUpBody {
  name: string;
  email: string;
  password: string;
}

export interface ISignInBody {
  email: string;
  password: string;
}

class AuthService {
  signup = (body: ISignUpBody) => apiClient.post("/auth/signup", body);
  signin = (body: ISignInBody) => apiClient.post("/auth/signin", body);
  signout = () => apiClient.post("/auth/signout");
}

export default new AuthService();
