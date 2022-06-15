import { PostActionType } from "../action-types";
import { PostAction } from "../actions/post";

const reducer = (state: any = [], action: PostAction) => {
  switch (action.type) {
    case PostActionType.FETCH_ALL:
      return action.payload;

    case PostActionType.CREATE:
      break;

    case PostActionType.UPDATE:
      break;

    case PostActionType.DELETE:
      break;

    default:
      return state;
  }
};

export default reducer;
