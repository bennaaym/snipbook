import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { PostActionCreators } from "../../redux/actions-creators";
import { RootState } from "../../redux/reducers";

const Posts = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { post } = useSelector((state: RootState) => state);

  console.log(post);

  useEffect(() => {
    dispatch(PostActionCreators.getAllPosts());
  }, [dispatch]);

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
};

export default Posts;
