import { PostActionType } from "../action-types";
import { IPost, PostAction } from "../actions/post";

const reducer = (state: IPost[] = [], action: PostAction) => {
  switch (action.type) {
    case PostActionType.FETCH_ALL:
      return [...action.payload];

    case PostActionType.CREATE:
      return [action.payload, ...state];

    case PostActionType.UPDATE:
      const postsAfterUpdate = state.filter(
        (post: any) => post.id !== action.payload.id
      );
      return [action.payload, ...postsAfterUpdate];

    case PostActionType.DELETE:
      return state.filter((post: any) => post.id !== action.payload.id);

    case PostActionType.LIKE:
      const postsAfterLike = state.filter(
        (post: any) => post.id !== action.payload.id
      );
      return [action.payload, ...postsAfterLike];

    default:
      return state;
  }
};

export default reducer;
