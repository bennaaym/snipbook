import { AuthActionType } from "../action-types";

export interface IAuthPayload {
  token: string;
  user: {
    id: number;
    name: string;
  };
}

interface IAuthStartAction {
  type: AuthActionType.AUTH_START;
  payload?: boolean;
}

interface IAuthSuccessAction {
  type: AuthActionType.AUTH_SUCCESS;
  payload: IAuthPayload;
}

interface IAuthErrorAction {
  type: AuthActionType.AUTH_ERROR;
  payload: string;
}

export type AuthAction =
  | IAuthSuccessAction
  | IAuthStartAction
  | IAuthErrorAction;

export const authStart = (): IAuthStartAction => ({
  type: AuthActionType.AUTH_START,
});

export const authSuccess = (payload: IAuthPayload): IAuthSuccessAction => ({
  type: AuthActionType.AUTH_SUCCESS,
  payload,
});

export const authError = (payload: string): IAuthErrorAction => ({
  type: AuthActionType.AUTH_ERROR,
  payload,
});
