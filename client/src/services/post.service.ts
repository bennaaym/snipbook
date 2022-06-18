import apiClient from "../api/apiClient";

interface Image {
  url: string;
}
export interface ICreatePostBody {
  title: string;
  description: string;
  tags: string[];
  images: Image[];
}
export interface IUpdatePostBody {
  title: string;
  description: string;
  tags: string[];
}

class PostService {
  getAllPosts = () => apiClient.get("/post");
  createPost = (body: ICreatePostBody) => apiClient.post("post", body);
  updatePost = (id: number, body: IUpdatePostBody) =>
    apiClient.patch(`post/${id}`, body);

  deletePost = (id: number) => apiClient.delete(`post/${id}`);
  likePost = (id: number) => apiClient.patch(`post/${id}/likes`);
}

export default new PostService();
