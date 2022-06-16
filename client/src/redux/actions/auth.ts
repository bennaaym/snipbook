import { AuthActionType } from "../action-types";

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

interface SignUpAction {
  type: AuthActionType.SIGN_UP;
  payload: ISignUp;
}

interface SignInAction {
  type: AuthActionType.SIGN_IN;
  payload: ISignIn;
}

export type AuthAction = SignUpAction | SignInAction;
