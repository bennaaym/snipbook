import { useSelector } from "react-redux";
import { IPost } from "../redux/actions/post";
import { RootState } from "../redux/reducers";

export const usePosts = (): IPost[] => {
  return useSelector((state: RootState) => state.posts) as IPost[];
};
