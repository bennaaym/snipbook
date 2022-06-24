import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { usePosts } from "../../hooks";
import { PostActionCreators } from "../../redux/actions-creators";
import PageContainer from "../PageContainer";
import Loading from "../Loading";
import postImage from "../../static/images/post_image.jpg";
import { customTheme } from "../../common";
import PostCard from "./PostCard";
import CommentSection from "./CommentSection";

const useStyles = makeStyles({
  post: {
    display: "flex",
    justifyContent: "space-between",
    columnGap: 20,
  },

  postDetails: {
    flex: 1,
  },

  tag: {
    background: `${customTheme.color.primary} !important`,
    color: `${customTheme.color.background} !important`,
    marginRight: 10,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },

  imgContainer: {
    flex: 1,
    height: "500px",
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    borderRadius: customTheme.borderRadius.md,
  },

  recommendationContainer: {
    // padding: "20px 0",
  },

  recommendedPosts: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: 20,
  },
});

const PostDetails = () => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const { posts, post, isLoading } = usePosts();
  const { id } = useParams();
  useEffect(() => {
    dispatch(PostActionCreators.getPostById(Number(id)));
  }, [dispatch, id]);

  useEffect(() => {
    if (!post?.tags?.length) return;
    dispatch(
      PostActionCreators.getPostBySearch(
        `tags=${post.tags.join(",")}`,
        () => {}
      )
    );
  }, [post, dispatch]);

  const recommendedPosts = useMemo(
    () => posts?.filter(({ id }) => id !== post?.id),
    [posts, post]
  );

  if (isLoading) return <Loading />;
  if (!post) return <span>not found</span>;
  return (
    <PageContainer>
      <Stack spacing={10}>
        <Box className={classes.post}>
          <Box className={classes.postDetails}>
            <Typography
              variant="h3"
              component="h2"
              textTransform={"capitalize"}
            >
              {post?.title}
            </Typography>
            {Boolean(post.tags.length) && (
              <>
                <Divider style={{ margin: "20px 0" }} />
                <Box>
                  {post?.tags.map((tag) => (
                    <Chip key={tag} label={`#${tag}`} className={classes.tag} />
                  ))}
                </Box>
              </>
            )}
            <Divider style={{ margin: "20px 0" }} />
            <Typography gutterBottom variant="body1" component="p">
              {post?.description}
            </Typography>
          </Box>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src={post.images[0].url}
              alt={post.title}
            />
          </Box>
        </Box>
        <Box>
          <CommentSection postId={Number(id)} comments={post?.comments} />
        </Box>
        {Boolean(recommendedPosts?.length) && (
          <Box className={classes.recommendationContainer}>
            <Typography
              variant="h5"
              component="h1"
              textTransform={"capitalize"}
              mb={2}
            >
              Recommended Post
            </Typography>
            <Divider />
            <Box className={classes.recommendedPosts}>
              {recommendedPosts.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    description={post.description}
                    tags={post.tags}
                    likes={post.likes}
                    imgUrl={post.images[0].url}
                    updatedAt={post.updatedAt}
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </Stack>
    </PageContainer>
  );
};

export default PostDetails;
