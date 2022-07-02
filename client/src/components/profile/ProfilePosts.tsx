import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { IPost } from "../../redux/actions/post";
import PostCard from "../post/PostCard";
import { RootState } from "../../redux/reducers";
import { makeStyles } from "@mui/styles";
import { IProfileState } from "../../redux/reducers/profile";

const useStyles = makeStyles({
  posts: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 10,
    columnGap: 30,
  },
});

const ProfilePosts = () => {
  const { profile } = useSelector(
    (state: RootState) => state.profile
  ) as IProfileState;
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {profile?.posts && (
        <Box className={classes.posts}>
          {profile?.posts.map((post: IPost) => (
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
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePosts;
