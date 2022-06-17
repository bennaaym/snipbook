import { AuthActionType } from "../action-types";
import { AuthAction, IAuthPayload } from "../actions/auth";

const reducer = (
  state: IAuthPayload = { token: undefined, user: undefined },
  action: AuthAction
) => {
  switch (action.type) {
    case AuthActionType.SIGN_UP:
      console.log(action.payload);
      return action.payload;

    case AuthActionType.SIGN_IN:
      console.log(action.payload);
      return action.payload;

    default:
      return null;
  }
};

export default reducer;
