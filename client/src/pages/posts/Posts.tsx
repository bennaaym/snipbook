import { Fragment, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Loading, PageContainer, PostCard } from "../../components";
import { useAuth, usePosts } from "../../hooks";
import { PostActionCreators } from "../../redux/actions-creators";

const useStyles = makeStyles({
  posts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
});

const Posts = () => {
  const classes = useStyles();
  const auth = useAuth();
  const posts = usePosts();

  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(PostActionCreators.getAllPosts());
  }, [auth, dispatch]);
  return (
    <Fragment>
      {!posts.length && <Loading />}
      {posts.length && (
        <PageContainer>
          <Box className={classes.posts}>
            {posts.map((post: any) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  userId={post.userId}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  likes={post.likes}
                  imgUrl={post.images ? post.images[0]?.url : null}
                  updatedAt={post.updatedAt}
                />
              );
            })}
          </Box>
        </PageContainer>
      )}
    </Fragment>
  );
};

export default Posts;
