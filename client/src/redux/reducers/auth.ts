import { AuthActionType } from "../action-types";
import { AuthAction, IAuthPayload } from "../actions/auth";

export interface IAuthState {
  data: IAuthPayload;
  loading: boolean;
  error: string | null;
}

const initialState = {
  data: {} as IAuthPayload,
  loading: false,
  error: null,
} as IAuthState;

const reducer = (
  state: IAuthState = initialState,
  { type, payload }: AuthAction
) => {
  switch (type) {
    case AuthActionType.AUTH_START:
      return {
        ...state,
        error: null,
        data: {},
        loading: true,
      };

    case AuthActionType.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case AuthActionType.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
