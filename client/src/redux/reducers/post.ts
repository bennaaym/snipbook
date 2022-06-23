import { PostActionType } from "../action-types";
import { IPost, PostAction } from "../actions/post";

export interface IPostState {
  currentPage: number;
  numberOfPages: number;
  posts: IPost[];
  post: IPost;
  isLoading: boolean;
}

const initialState = {
  currentPage: 1,
  numberOfPages: 1,
  posts: [],
  post: {} as IPost,
  isLoading: true,
};

const reducer = (
  state: IPostState = initialState,
  { type, payload }: PostAction
) => {
  switch (type) {
    case PostActionType.FETCH_ALL:
      return payload;

    case PostActionType.FETCH_ONE:
      return {
        ...state,
        post: payload,
      };

    case PostActionType.CREATE:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };

    case PostActionType.UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? payload : post
        ),
      };

    case PostActionType.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post: IPost) => post.id !== payload.id),
      };

    case PostActionType.LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? payload : post
        ),
      };

    case PostActionType.SEARCH:
      return {
        ...state,
        posts: payload,
      };

    case PostActionType.CREATE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? payload : post
        ),
      };

    case PostActionType.DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? payload : post
        ),
      };

    case PostActionType.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case PostActionType.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
