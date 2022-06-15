import axios from "axios";
import { ICreatePostBody, IUpdatePostBody } from "./interfaces/post";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const getAllPosts = () => API.get("/post");
export const createPost = (body: ICreatePostBody) => API.post("post", body);
export const updatePost = (id: number, body: IUpdatePostBody) =>
  API.patch(`post/${id}`, body);
