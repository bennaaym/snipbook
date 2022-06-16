import { API } from "./api";
import { ICreatePostBody, IUpdatePostBody } from "./interfaces/post";

export const getAllPosts = () => API.get("/post");
export const createPost = (body: ICreatePostBody) => API.post("post", body);
export const updatePost = (id: number, body: IUpdatePostBody) =>
  API.patch(`post/${id}`, body);

export const deletePost = (id: number) => API.delete(`post/${id}`);
export const likePost = (id: number) => API.patch(`post/${id}/likes`);
