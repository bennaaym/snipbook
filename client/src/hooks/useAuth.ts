import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { IAuthState } from "../redux/reducers/auth";

export const useAuth = (): IAuthState => {
  const auth = useSelector((state: RootState) => state.auth) as IAuthState;
  return auth;
};
