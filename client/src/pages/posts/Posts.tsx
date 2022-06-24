import { Fragment, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  CustomPagination,
  Loading,
  PageContainer,
  PostCard,
} from "../../components";
import { useAuth, usePosts } from "../../hooks";
import { PostActionCreators } from "../../redux/actions-creators";

const useStyles = makeStyles({
  posts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 30,
  },
});

const Posts = () => {
  const classes = useStyles();
  const auth = useAuth();
  const { posts, isLoading } = usePosts();
  const dispatch: Dispatch<any> = useDispatch();
  useEffect(() => {
    dispatch(PostActionCreators.getAllPosts(1));
  }, [auth, dispatch]);

  if (isLoading) return <Loading />;

  if (!isLoading && !posts?.length)
    return (
      <PageContainer>
        <Typography>No Posts Found</Typography>
      </PageContainer>
    );

  return (
    <Fragment>
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
                imgUrl={post.images[0]?.url}
                updatedAt={post.updatedAt}
              />
            );
          })}
        </Box>
        <CustomPagination />
      </PageContainer>
    </Fragment>
  );
};

export default Posts;
