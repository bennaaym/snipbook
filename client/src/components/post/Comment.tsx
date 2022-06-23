import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import postAvatar from "../../static/images/user_avatar.jpg";
import moment from "moment";
import { Delete } from "@mui/icons-material";
import { customTheme } from "../../common";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { PostActionCreators } from "../../redux/actions-creators";
import { useAuth } from "../../hooks";
import { useState } from "react";

interface IProps {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: Date;
}

const Comment: React.FC<IProps> = ({
  id,
  postId,
  userId,
  content,
  createdAt,
}) => {
  const [visible, setVisible] = useState(true);
  const { data: auth } = useAuth();
  const dispatch: Dispatch<any> = useDispatch();
  const handleDeleteComment = () => {
    dispatch(PostActionCreators.deleteComment(id, postId));
    setVisible(false);
  };

  if (!visible) return <></>;

  return (
    <Paper style={{ padding: "40px 20px", position: "relative" }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt="user_avatar" src={postAvatar} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography component="h4" fontWeight={800}>
            Marry Curry
          </Typography>
          <Typography component="p" fontWeight={400} fontSize={12} mb={2}>
            {moment(createdAt).fromNow()}
          </Typography>
          <Typography component="p" fontSize={14}>
            {content}
          </Typography>
        </Grid>
      </Grid>
      {auth?.user?.id === userId && (
        <Box
          style={{ position: "absolute", top: 20, right: 20 }}
          onClick={handleDeleteComment}
        >
          <Delete
            style={{
              fontSize: 24,
              color: customTheme.color.title,
              cursor: "pointer",
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default Comment;
