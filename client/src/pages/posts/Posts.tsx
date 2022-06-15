import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { PageContainer, PostCard } from "../../components";
import { PostActionCreators } from "../../redux/actions-creators";
import { RootState } from "../../redux/reducers";

const useStyles = makeStyles({
  posts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 120,
  },
});

const Posts = () => {
  const classes = useStyles();
  const { posts } = useSelector((state: RootState) => state);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(PostActionCreators.getAllPosts());
  }, [dispatch]);
  return (
    <Fragment>
      <PageContainer>
        <Box className={classes.posts}>
          {posts.map((post: any) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                likes={0}
                imgUrl={posts.images ? post.images[0]?.url : null}
                updatedAt={post.updatedAt}
              />
            );
          })}
        </Box>
      </PageContainer>
    </Fragment>
  );
};

export default Posts;
