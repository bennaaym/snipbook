import { PostActionType } from "../action-types";
import { IPost, PostAction } from "../actions/post";

export interface IPostState {
  currentPage: number;
  numberOfPages: number;
  posts: IPost[];
}

const initialState = {
  currentPage: 1,
  numberOfPages: 1,
  posts: [],
};

const reducer = (
  state: IPostState = initialState,
  { type, payload }: PostAction
) => {
  switch (type) {
    case PostActionType.FETCH_ALL:
      return payload;

    case PostActionType.CREATE:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };

    case PostActionType.UPDATE:
      const postsAfterUpdate = state.posts.filter(
        (post: IPost) => post.id !== payload.id
      );

      return {
        ...state,
        posts: [payload, ...postsAfterUpdate],
      };

    case PostActionType.DELETE:
      const postsAfterDelete = state.posts.filter(
        (post: IPost) => post.id !== payload.id
      );
      return {
        ...state,
        posts: postsAfterDelete,
      };

    case PostActionType.LIKE:
      const postIndex = state.posts.findIndex(
        (post: IPost) => post.id === payload.id
      );
      state.posts[postIndex] = payload;

      return {
        ...state,
        posts: [...state.posts],
      };

    case PostActionType.SEARCH:
      return {
        ...state,
        posts: payload,
      };

    default:
      return state;
  }
};

export default reducer;
