import { PostActionType } from "../action-types";

export interface IPost {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  likes: { id: number; userId: number; createdAt: Date }[];
  updatedAt: Date;
}

interface FetchAllAction {
  type: PostActionType.FETCH_ALL;
  payload: {
    currentPage: number;
    numberOfPages: number;
    posts: IPost[];
  };
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
  payload: IPost;
}

interface SearchAction {
  type: PostActionType.SEARCH;
  payload: IPost[];
}

export type PostAction =
  | FetchAllAction
  | CreateAction
  | UpdateAction
  | DeleteAction
  | LikeAction
  | SearchAction;