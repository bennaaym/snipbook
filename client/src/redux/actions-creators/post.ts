import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { PostService } from "../../services";
import { ICreatePostBody, IUpdatePostBody } from "../../services/post.service";
import { PostActionType } from "../action-types";

export const getAllPosts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await PostService.getAllPosts();
      dispatch({
        type: PostActionType.FETCH_ALL,
        payload: data?.data?.posts || [],
      });
    } catch (err: any) {
      console.log(err);
    }
  };
};

export const createPost = (
  body: ICreatePostBody,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await PostService.createPost(body);

      dispatch({
        type: PostActionType.CREATE,
        payload: data?.data?.post,
      });
      navigate("/posts");
    } catch (err: any) {
      console.log(err.message);
    }
  };
};

export const updatePost = (
  id: number,
  body: IUpdatePostBody,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await PostService.updatePost(id, body);
      dispatch({
        type: PostActionType.UPDATE,
        payload: res?.data?.data?.post,
      });
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePost = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await PostService.deletePost(id);
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
  return async (dispatch: Dispatch) => {
    try {
      const res = await PostService.likePost(id);
      dispatch({
        type: PostActionType.LIKE,
        payload: res?.data?.data?.post,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
