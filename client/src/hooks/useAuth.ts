import { useSelector } from "react-redux";
import { IAuthPayload } from "../redux/actions/auth";
import { RootState } from "../redux/reducers";

export const useAuth = (): IAuthPayload => {
  const auth = useSelector((state: RootState) => state.auth);
  return auth;
};
