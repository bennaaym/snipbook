import { PostActionType } from "../action-types";

interface IPost {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  likeCount: number;
  updateAt: Date;
}

interface FetchAllAction {
  type: PostActionType.FETCH_ALL;
  payload: IPost[];
}

interface CreateAction {
  type: PostActionType.CREATE;
  payload: IPost;
}

interface UpdateAction {
  type: PostActionType.UPDATE;
  payload: IPost;
}

interface DeleteAction {
  type: PostActionType.DELETE;
  payload: { id: number };
}

interface LikeAction {
  type: PostActionType.LIKE;
  payload: { [key: string]: any };
}

export type PostAction =
  | FetchAllAction
  | CreateAction
  | UpdateAction
  | DeleteAction
  | LikeAction;
