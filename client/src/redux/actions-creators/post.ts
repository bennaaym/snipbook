import { Dispatch } from "redux";
import * as API from "../../api";
import { ICreatePostBody } from "../../api/interfaces/post";
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

export const createPost = (body: ICreatePostBody) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const res = await API.createPost(body);
      dispatch({
        type: PostActionType.CREATE,
        payload: res?.data?.data?.post,
      });
    } catch (err) {
      console.log(err);
    }
  };
};