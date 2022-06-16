import { AuthActionType } from "../action-types";
import { AuthAction } from "../actions/auth";

interface IUser {
  id?: string;
  name?: string;
}

const reducer = (state: IUser = {}, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.SIGN_UP:
      console.log(action.payload);
      return state;

    case AuthActionType.SIGN_IN:
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

export default reducer;
