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
  getProfile = (id: number) => apiClient.get(`/profile/${id}`);
}

export default new AuthService();
