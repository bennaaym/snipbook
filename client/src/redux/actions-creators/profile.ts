import { Dispatch } from "redux";
import profileService from "../../services/profile.service";
import { ProfileActionType } from "../action-types";

export const getProfile = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await profileService.getProfile(id);
      dispatch({ type: ProfileActionType.START_LOADING });
      dispatch({
        type: ProfileActionType.FETCH_PROFILE,
        payload: data?.data?.profile,
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: ProfileActionType.END_LOADING });
    }
  };
};
