import { Dispatch } from "redux";
import * as API from "../../api";
import { ICreatePostBody, IUpdatePostBody } from "../../api/interfaces/post";
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

export const updatePost = (id: number, body: IUpdatePostBody) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const res = await API.updatePost(id, body);
      dispatch({
        type: PostActionType.UPDATE,
        payload: res?.data?.data?.post,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePost = (id: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await API.deletePost(id);
      dispatch({
        type: PostActionType.DELETE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const likePost = (id: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      const res = await API.likePost(id);
      dispatch({
        type: PostActionType.LIKE,
        payload: res?.data?.data?.post,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
