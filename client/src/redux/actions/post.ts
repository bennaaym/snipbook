import { PostActionType } from "../action-types";

interface FetchAllAction {
  type: PostActionType.FETCH_ALL;
  payload: any[];
}

interface CreateAction {
  type: PostActionType.CREATE;
  payload: { [key: string]: any };
}

interface UpdateAction {
  type: PostActionType.UPDATE;
  payload: { [key: string]: any };
}

interface DeleteAction {
  type: PostActionType.DELETE;
  payload: { [key: string]: any };
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
