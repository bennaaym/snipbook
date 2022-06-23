import { useState, useRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PostActionCreators } from "../../redux/actions-creators";
import { customTheme } from "../../common";
import Comment from "./Comment";
const useStyles = makeStyles({
  textAreaWrapper: {
    width: "100%",
    position: "relative",
  },
  textArea: {
    width: "100%",
    resize: "none",
    outline: "none",
    padding: 5,
    borderRadius: 5,
    height: 150,
    border: `2px solid ${customTheme.color.paragraph}`,
  },
  commentButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    color: customTheme.color.background,
    background: customTheme.color.paragraph,
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },
  comments: {
    maxHeight: 520,
    padding: 10,
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "2px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: customTheme.color.paragraph,
      outline: `1px solid ${customTheme.color.paragraph}`,
    },
  },
});

interface IProps {
  postId: number;
  comments: {
    id: number;
    userId: number;
    content: string;
    createdAt: Date;
  }[];
}

const CommentSection: React.FC<IProps> = ({
  postId,
  comments: postComments,
}) => {
  const classes = useStyles();
  const [comments, setComments] = useState(postComments);
  const [comment, setComment] = useState("");
  const { data: auth } = useAuth();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const lastCommentRef = useRef<any>();

  const handleCommentSubmit = async () => {
    if (!comment) return;
    const newComments = await dispatch(
      PostActionCreators.createComment(postId, comment)
    );
    setComment("");
    setComments(newComments as any);
    lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCommentClick = () => {
    if (!auth?.accessToken) {
      navigate("/signin");
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        textTransform={"capitalize"}
        mb={2}
      >
        comments
      </Typography>
      <Stack spacing={2}>
        <Box className={classes.textAreaWrapper}>
          <textarea
            className={classes.textArea}
            placeholder="comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onClick={handleCommentClick}
          ></textarea>
          {comment && (
            <Box
              className={classes.commentButton}
              onClick={handleCommentSubmit}
            >
              <Send style={{ fontSize: 18 }} />
            </Box>
          )}
        </Box>
        <Stack spacing={2} className={classes.comments}>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              postId={postId}
              userId={1}
              content={comment.content}
              createdAt={new Date(Date.now())}
            />
          ))}
          <div ref={lastCommentRef}></div>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CommentSection;
