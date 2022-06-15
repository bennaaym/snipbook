import { Dispatch } from "redux";
import * as API from "../../api";
import { PostActionType } from "../action-types";
import { PostAction } from "../actions/post";

export const getAllPosts = () => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const res = await API.getAllPosts();
      dispatch({
        type: PostActionType.FETCH_ALL,
        payload: res?.data?.data?.posts || [],
      });
    } catch (err) {
      console.log(err);
    }
  };
};
