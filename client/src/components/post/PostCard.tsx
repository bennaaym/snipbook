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
import postImage from "../../static/images/post_image.jpg";
import postAvatar from "../../static/images/user_avatar.jpg";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  PostActionCreators,
  ProfileActionCreators,
} from "../../redux/actions-creators";
import { ProfileComponent } from "../../redux/actions/profile";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  imgUrl: string;
  likes: number;
  updatedAt: Date;
}

const PostCard: React.FC<IProps> = ({
  id,
  title,
  description,
  tags,
  imgUrl,
  likes,
  updatedAt,
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = () => {
    dispatch(
      ProfileActionCreators.updateComponent(ProfileComponent.UPDATE_FORM)
    );
    navigate(`/profile/posts/update/${id}`);
  };
  const handleDelete = () => {
    dispatch(PostActionCreators.deletePost(id));
  };

  const handleLike = () => {
    dispatch(PostActionCreators.likePost(id));
  };
  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img
              src={postAvatar}
              alt="post_avatar"
              style={{ objectFit: "cover" }}
              width="50px"
              height="50px"
            />
          </Avatar>
        }
        action={
          <Box>
            <IconButton aria-label="settings" onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton aria-label="settings" onClick={handleUpdate}>
              <MoreVert />
            </IconButton>
          </Box>
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
        component="img"
        height="194"
        image={imgUrl ? imgUrl : postImage}
        alt="post_image"
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
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            <Favorite />
          </IconButton>
          <Typography
            variant="body1"
            component="span"
            fontSize={16}
            marginLeft={1}
          >
            {likes}
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
