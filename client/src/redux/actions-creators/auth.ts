import { Dispatch } from "redux";
import { ISignInBody, ISignUpBody } from "../../api/interfaces/auth";
import { AuthActionType } from "../action-types";

export const signup = (body: ISignUpBody) => {
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

export const signin = (body: ISignInBody) => {
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
