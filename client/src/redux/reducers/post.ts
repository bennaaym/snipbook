import { PostActionType } from "../action-types";
import { PostAction } from "../actions/post";

const reducer = (state: any = [], action: PostAction) => {
  switch (action.type) {
    case PostActionType.FETCH_ALL:
      return action.payload;

    case PostActionType.CREATE:
      return [action.payload, ...state];

    case PostActionType.UPDATE:
      const filteredPosts = state.filter(
        (post: any) => post.id !== action.payload.id
      );
      return [action.payload, ...filteredPosts];

    case PostActionType.DELETE:
      return state;

    default:
      return state;
  }
};

export default reducer;
