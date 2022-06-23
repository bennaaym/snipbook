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
  getAllPosts = (page: number) => apiClient.get(`/post?page=${page}`);
  createPost = (body: ICreatePostBody, accessToken: string) =>
    apiClient.post("post", body, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  updatePost = (id: number, body: IUpdatePostBody, accessToken: string) =>
    apiClient.patch(`post/${id}`, body, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

  deletePost = (id: number, accessToken: string) =>
    apiClient.delete(`post/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

  likePost = (id: number, accessToken: string) =>
    apiClient.patch(
      `post/${id}/likes`,
      {},
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

  getPostBySearch = (query: string) => apiClient.get(`/post/search?${query}`);
}

export default new PostService();
