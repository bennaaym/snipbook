import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Favorite, Share, MoreVert, Delete } from "@mui/icons-material";
import { customTheme } from "../../common";
import moment from "moment";
import postAvatar from "../../static/images/user_avatar.jpg";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PostActionCreators } from "../../redux/actions-creators";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface IProps {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  imgUrl: string;
  likes: { id: number; userId: number; createdAt: Date }[];
  updatedAt: Date;
}

const PostCard: React.FC<IProps> = ({
  id,
  userId,
  title,
  description,
  tags,
  imgUrl,
  likes,
  updatedAt,
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const { data: auth } = useAuth();
  const handleUpdate = () => {
    navigate(`/profile/${auth?.user.id}/post/update/${id}`);
  };
  const handleDelete = () => {
    dispatch(PostActionCreators.deletePost(id));
  };

  const handleLike = () => {
    if (!auth?.accessToken) {
      navigate("/signin");
      return;
    }
    dispatch(PostActionCreators.likePost(id));
  };

  const userLikedPost = React.useMemo(() => {
    return Boolean(likes.find((like) => like.userId === auth?.user?.id));
  }, [auth, likes]);

  const handleAvatarClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleCardClick = () => navigate(`/posts/${id}`);

  return (
    <Card sx={{ width: 340 }}>
      <CardHeader
        avatar={
          <IconButton onClick={handleAvatarClick}>
            <Avatar aria-label="recipe">
              <img
                src={postAvatar}
                alt="post_avatar"
                style={{ objectFit: "cover" }}
                width="50px"
                height="50px"
              />
            </Avatar>
          </IconButton>
        }
        action={
          auth?.user?.id === userId ? (
            <Box>
              <IconButton aria-label="settings" onClick={handleDelete}>
                <Delete />
              </IconButton>
              <IconButton aria-label="settings" onClick={handleUpdate}>
                <MoreVert />
              </IconButton>
            </Box>
          ) : null
        }
        title={
          <Typography
            variant="body1"
            component="h4"
            textTransform={"capitalize"}
            color={customTheme.color.title}
          >
            {title}
          </Typography>
        }
        subheader={moment(updatedAt).fromNow()}
      />
      <CardMedia
        onClick={handleCardClick}
        component="img"
        height="194"
        image={imgUrl}
        alt="post_image"
        style={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography variant="body2" color={customTheme.color.paragraph}>
          {description}
        </Typography>
      </CardContent>
      {tags && (
        <CardContent
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 10,
          }}
        >
          {tags.map((tag) => {
            return (
              <Chip
                key={`${id}-${tag}`}
                label={`#${tag}`}
                style={{
                  background: customTheme.color.primary,
                  color: customTheme.color.background,
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
            );
          })}
        </CardContent>
      )}
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton
            aria-label="add to favorites"
            onClick={handleLike}
            sx={{ color: userLikedPost ? customTheme.color.pink : "gray" }}
          >
            <Favorite />
          </IconButton>
          <Typography
            variant="body1"
            component="span"
            fontSize={16}
            marginLeft={1}
          >
            {likes.length}
          </Typography>
        </Box>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
