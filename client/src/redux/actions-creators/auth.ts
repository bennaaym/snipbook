import { Dispatch } from "redux";
import { AuthService } from "../../services";
import { ISignInBody, ISignUpBody } from "../../services/auth.service";
import { authError, authStart, authSuccess } from "../actions/auth";

export const signup = (body: ISignUpBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const { data } = await AuthService.signup(body);
      if (data.status !== "success") throw new Error(data?.response?.message);
      dispatch(
        authSuccess({
          token: data?.token,
          user: data?.data?.user,
        })
      );
      redirect();
    } catch (err: any) {
      console.log(err);
      dispatch(authError(err.message));
    }
  };
};

export const signin = (body: ISignInBody, redirect: () => void) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const { data } = await AuthService.signin(body);
      if (data.status !== "success") throw new Error(data?.response?.message);
      dispatch(
        authSuccess({
          token: data?.token,
          user: data?.data?.user,
        })
      );
      redirect();
    } catch (err: any) {
      console.log(err);
      dispatch(authError(err.message));
    }
  };
};
