import { Dispatch } from "redux";
import { ProfileActionType } from "../action-types";
import { ProfileAction, ProfileComponent } from "../actions/profile";

export const updateComponent = (component: ProfileComponent) => {
  return (dispatch: Dispatch<ProfileAction>) => {
    dispatch({
      type: ProfileActionType.UPDATE_COMPONENT,
      payload: component,
    });
  };
};
