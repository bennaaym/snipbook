import { Console } from "console";
import { PostActionType } from "../action-types";
import { IPost, PostAction } from "../actions/post";

const reducer = (state: IPost[] = [], { type, payload }: PostAction) => {
  switch (type) {
    case PostActionType.FETCH_ALL:
      return payload;

    case PostActionType.CREATE:
      return [...state, payload];

    case PostActionType.UPDATE:
      const postsAfterUpdate = state.filter(
        (post: IPost) => post.id !== payload.id
      );
      return [payload, ...postsAfterUpdate];

    case PostActionType.DELETE:
      const postsAfterDelete = state.filter(
        (post: IPost) => post.id !== payload.id
      );
      return postsAfterDelete;

    case PostActionType.LIKE:
      const postIndex = state.findIndex(
        (post: IPost) => post.id === payload.id
      );
      state[postIndex] = payload;

      return [...state];

    default:
      return state;
  }
};

export default reducer;
