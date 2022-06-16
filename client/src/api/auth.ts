import { API } from "./api";
import { ISignUpBody, ISignInBody } from "./interfaces/auth";

export const signup = (body: ISignUpBody) => API.post("/auth/signup", body);
export const signin = (body: ISignInBody) => API.post("/auth/signin", body);
