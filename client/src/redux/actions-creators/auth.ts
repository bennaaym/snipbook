import { Dispatch } from "redux";
import { AuthService } from "../../services";
import { ISignInBody, ISignUpBody } from "../../services/auth.service";
import {
  authError,
  authStart,
  authSuccess,
  IAuthPayload,
} from "../actions/auth";
import jwt_decode from "jwt-decode";

export const signup = (body: ISignUpBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const { data } = await AuthService.signup(body);
      dispatch(
        authSuccess({
          accessToken: data?.accessToken,
          user: jwt_decode(data?.accessToken),
        })
      );
      redirect();
    } catch (err: any) {
      console.log(err);
      dispatch(authError(err?.response?.data?.message));
    }
  };
};

export const signin = (body: ISignInBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const { data } = await AuthService.signin(body);
      dispatch(
        authSuccess({
          accessToken: data?.accessToken,
          user: jwt_decode(data?.accessToken),
        })
      );
      redirect();
    } catch (err: any) {
      dispatch(authError(err?.response?.data?.message));
    }
  };
};

export const signout = (redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      await AuthService.signout();
      dispatch(authSuccess({} as IAuthPayload));
      redirect();
    } catch (err: any) {
      console.log(err);
      dispatch(authError(err?.response?.data?.message));
    }
  };
};

export const refresh = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const { data } = await AuthService.refresh();
      console.log(data?.accessToken);
      dispatch(
        authSuccess({
          accessToken: data?.accessToken,
          user: jwt_decode(data?.accessToken),
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
