import { ProfileActionType } from "../action-types";
import { IPost } from "./post";

export interface IProfile {
  id: number;
  name: string;
  createdAt: Date;
  posts: IPost[];
  totalLikes: number;
}

interface FetchProfileAction {
  type: ProfileActionType.FETCH_PROFILE;
  payload: IProfile;
}

interface LikePostAction {
  type: ProfileActionType.LIKE_POST;
  payload: IPost;
}

export type ProfileAction = FetchProfileAction | LikePostAction;
