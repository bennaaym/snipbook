import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const getAllPosts = () => API.get("/post");
