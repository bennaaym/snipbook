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
        (post: any) => post.id !== payload.id
      );
      return [payload, ...postsAfterUpdate];

    case PostActionType.DELETE:
      const postsAfterDelete = state.filter(
        (post: any) => post.id !== payload.id
      );
      return [payload, ...postsAfterDelete];

    case PostActionType.LIKE:
      const postsAfterLike = state.filter(
        (post: any) => post.id !== payload.id
      );

      return [payload.data, postsAfterLike];

    default:
      return state;
  }
};

export default reducer;
