import { PostActionType } from "../action-types";

export interface IPost {
  selectedFile: string;
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  images: {
    id: number;
    url: string;
  }[];
  likes: { id: number; userId: number; createdAt: Date }[];
  comments: { id: number; content: string; userId: number; createdAt: Date }[];
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

interface FetchOneAction {
  type: PostActionType.FETCH_ONE;
  payload: IPost;
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

interface CreateCommentAction {
  type: PostActionType.CREATE_COMMENT;
  payload: IPost;
}

interface DeleteCommentAction {
  type: PostActionType.DELETE_COMMENT;
  payload: IPost;
}

interface LoadingAction {
  type: PostActionType.START_LOADING | PostActionType.END_LOADING;
  payload: null;
}

export type PostAction =
  | FetchAllAction
  | FetchOneAction
  | CreateAction
  | UpdateAction
  | DeleteAction
  | LikeAction
  | SearchAction
  | CreateCommentAction
  | DeleteCommentAction
  | LoadingAction;
