import { Dispatch } from "redux";
import { ISignInBody, ISignUpBody } from "../../api/interfaces/auth";
import { AuthActionType } from "../action-types";
import * as API from "../../api";

export const signup = (body: ISignUpBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await API.signup(body);
      dispatch({
        type: AuthActionType.SIGN_UP,
        payload: {
          token: res?.data?.token,
          user: res?.data?.data?.user,
        },
      });
      redirect();
    } catch (err) {
      console.log(err);
    }
  };
};

export const signin = (body: ISignInBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await API.signin(body);
      dispatch({
        type: AuthActionType.SIGN_IN,
        payload: {
          token: res?.data?.token,
          user: res?.data?.data?.user,
        },
      });
      redirect();
    } catch (err) {
      console.log(err);
    }
  };
};
