import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { IPostState } from "../redux/reducers/post";

export const usePosts = (): IPostState => {
  const postState = useSelector(
    (state: RootState) => state.posts
  ) as IPostState;
  return postState;
};
