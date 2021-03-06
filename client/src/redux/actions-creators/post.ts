import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
import { PostService } from "../../services";
import { ICreatePostBody, IUpdatePostBody } from "../../services/post.service";
import { PostActionType } from "../action-types";

export const getAllPosts = (page: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await PostService.getAllPosts(page);
      dispatch({ type: PostActionType.START_LOADING });
      dispatch({
        type: PostActionType.FETCH_ALL,
        payload: data?.data,
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      dispatch({ type: PostActionType.END_LOADING });
    }
  };
};

export const getPostById = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await PostService.getPostById(id);
      dispatch({ type: PostActionType.START_LOADING });
      dispatch({
        type: PostActionType.FETCH_ALL,
        payload: data?.data,
      });
    } catch (err: any) {
      console.log(err);
    } finally {
      dispatch({ type: PostActionType.END_LOADING });
    }
  };
};

export const getPostBySearch = (query: string, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.getPostBySearch(query);
      dispatch({ type: PostActionType.START_LOADING });
      dispatch({
        type: PostActionType.SEARCH,
        payload: data?.data?.posts || [],
      });
      navigate(`/posts/search?${query}`);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: PostActionType.END_LOADING });
    }
  };
};

export const createPost = (
  body: ICreatePostBody,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.createPost(
        body,
        getState().auth.data.accessToken
      );

      dispatch({ type: PostActionType.START_LOADING });
      dispatch({
        type: PostActionType.CREATE,
        payload: data?.data?.post,
      });
      navigate("/posts");
    } catch (err: any) {
      console.log(err);
    } finally {
      dispatch({ type: PostActionType.END_LOADING });
    }
  };
};

export const updatePost = (
  id: number,
  body: IUpdatePostBody,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.updatePost(
        id,
        body,
        getState().auth.data.accessToken
      );
      dispatch({
        type: PostActionType.UPDATE,
        payload: data?.data?.post,
      });
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };
};

export const deletePost = (id: number) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      await PostService.deletePost(id, getState().auth.data.accessToken);
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
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.likePost(
        id,
        getState().auth.data.accessToken
      );
      dispatch({
        type: PostActionType.LIKE,
        payload: data?.data?.post,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createComment = (id: number, content: string) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.createComment(
        id,
        content,
        getState().auth.data.accessToken
      );
      dispatch({
        type: PostActionType.CREATE_COMMENT,
        payload: data?.data?.post,
      });
      return data?.data?.post?.comments;
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteComment = (id: number, postId: number) => {
  return async (dispatch: Dispatch, getState: CallableFunction) => {
    try {
      const { data } = await PostService.deleteComment(
        id,
        postId,
        getState().auth.data.accessToken
      );
      dispatch({
        type: PostActionType.DELETE_COMMENT,
        payload: data?.data?.post,
      });
      return data?.data?.post?.comments;
    } catch (err) {
      console.log(err);
    }
  };
};
