import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Tags from "./Tags";
import { customTheme } from "../../common";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PostActionCreators } from "../../redux/actions-creators";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../hooks";
import UploadFile from "../UploadFile";
import useS3 from "../../hooks/useS3";

const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: "800px",
  },

  formElement: {
    width: "100%",
    padding: 10,
    color: customTheme.color.paragraph,
    fontSize: 16,
    borderRadius: 5,
    border: `2px solid ${customTheme.color.paragraph}`,
    "&:focus": {
      outline: "none",
    },
  },

  textarea: {
    height: 200,
  },

  tags: {
    display: "flex",
    alignItems: "center",
    columnGap: 20,
  },

  submitButton: {
    color: customTheme.color.background,
    backgroundColor: customTheme.color.primary,
    borderRadius: 5,
    fontSize: 16,
    border: 0,
    padding: "15px 0",
    "&:hover": {
      opacity: 0.9,
    },
    cursor: "pointer",
  },
});

const PostForm = () => {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>();
  const [data, upload] = useS3() as any;
  const [tags, setTags] = useState<string[]>([]);
  const { posts } = usePosts();
  const { postId: id } = useParams();

  const post = useMemo(() => {
    return posts.find((post: any) => `${post.id}` === id);
  }, [posts, id]);

  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    if (post) {
      // update an existing post
      dispatch(
        PostActionCreators.updatePost(
          post.id,
          {
            ...values,
            tags,
            images: data?.url ? [{ url: `${data?.url}` }] : [],
          },
          navigate
        )
      );
    } else {
      // create a new post
      dispatch(
        PostActionCreators.createPost(
          {
            ...values,
            tags,
            images: data ? [{ url: `${data?.url}` }] : [],
          },
          navigate
        )
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      title: (post?.title as string) || "",
      description: (post?.description as string) || "",
    },
    validationSchema: yup.object({
      title: yup
        .string()
        .min(10, "Title must be 10 characters or more")
        .required("Required"),

      description: yup
        .string()
        .min(10, "Description must be 10 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await upload(file);
      handleSubmit(values);
    },
  });
  return (
    <Fragment>
      <Box className={classes.root}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>
            <Stack spacing={1}>
              <input
                className={classes.formElement}
                style={{
                  borderColor: formik.errors.title
                    ? "red"
                    : customTheme.color.paragraph,
                }}
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && (
                <Typography component="p" color="error">
                  {formik.errors.title}
                </Typography>
              )}
            </Stack>
            <Stack spacing={1}>
              <textarea
                id="description"
                name="description"
                className={`${classes.formElement} ${classes.textarea}`}
                style={{
                  borderColor: formik.errors.description
                    ? "red"
                    : customTheme.color.paragraph,
                }}
                placeholder="Description..."
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
              {formik.errors.description && (
                <Typography component="p" color="error">
                  {formik.errors.description}
                </Typography>
              )}
            </Stack>
            <Box className={classes.tags}>
              <Typography
                fontSize={16}
                fontWeight={600}
                textTransform="capitalize"
              >
                add tags
              </Typography>
              <Tags
                tags={tags}
                onChange={(tags) => setTags(tags)}
                maxTags={3}
              />
            </Box>
            {!post && (
              <Stack spacing={2}>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  textTransform="capitalize"
                >
                  upload image
                </Typography>
                <UploadFile
                  allowedExtensions={["png", "jpeg", "jpg"]}
                  onChange={(file: any) => setFile(file)}
                />
              </Stack>
            )}
            <input
              type="submit"
              value="publish"
              className={classes.submitButton}
            />
          </Stack>
        </form>
      </Box>
    </Fragment>
  );
};

export default PostForm;
