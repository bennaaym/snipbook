import { ProfileActionType } from "../action-types";

export enum ProfileComponent {
  CREATE_FORM = "CREATE_FORM",
  UPDATE_FORM = "UPDATE_FORM",
  POSTS = "POSTS",
}

interface UpdateProfileComponent {
  type: ProfileActionType.UPDATE_COMPONENT;
  payload: ProfileComponent;
}

export type ProfileAction = UpdateProfileComponent;
