import { Dispatch } from "redux";
import { AuthActionType } from "../action-types";
import { ISignIn, ISignUp } from "../actions/auth";

export const signup = (body: ISignUp) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AuthActionType.SIGN_UP,
        payload: body,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const signin = (body: ISignIn) => {
  return (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AuthActionType.SIGN_IN,
        payload: body,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
