import { AuthActionType } from "../action-types";

export interface IAuthPayload {
  token?: string;
  user?: {
    id: number;
    name: string;
  };
}

interface SignUpAction {
  type: AuthActionType.SIGN_UP;
  payload: IAuthPayload;
}

interface SignInAction {
  type: AuthActionType.SIGN_IN;
  payload: IAuthPayload;
}

export type AuthAction = SignUpAction | SignInAction;
