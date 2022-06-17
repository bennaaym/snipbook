import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment, useEffect } from "react";
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
    rowGap: 10,
    columnGap: 120,
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
      {posts.length ? (
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
                  likes={post.likeCount}
                  imgUrl={post.images ? post.images[0]?.url : null}
                  updatedAt={post.updatedAt}
                />
              );
            })}
          </Box>
        </PageContainer>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Posts;
