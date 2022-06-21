import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../redux/actions-creators";

export const useRefreshToken = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const refresh = () => {
    dispatch(AuthActionCreators.refresh());
  };

  return refresh;
};
