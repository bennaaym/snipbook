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
} from "@mui/material";
import { Favorite, Share, MoreVert } from "@mui/icons-material";
import { customTheme } from "../../common";
import moment from "moment";
import postImage from "../../static/images/post_image.jpg";
import postAvatar from "../../static/images/user_avatar.jpg";

interface IProps {
  title: string;
  description: string;
  imgUrl: string;
  likes: number;
  updatedAt: Date;
}

const PostCard: React.FC<IProps> = ({
  title,
  description,
  imgUrl,
  likes,
  updatedAt,
}) => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 400 }}>
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
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
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
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton aria-label="add to favorites">
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
