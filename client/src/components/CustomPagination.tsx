import { useEffect } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { customTheme } from "../common";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { PostActionCreators } from "../redux/actions-creators";
import { usePosts } from "../hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    display: "flex",
    alignItems: "center",
  },
}));

const CustomPagination = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const classes = useStyles();
  const { numberOfPages } = usePosts();
  const page = parseInt(query.get("page") || "1", 10);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(PostActionCreators.getAllPosts(page));
  }, [page, dispatch]);

  return (
    <Stack spacing={2} className={classes.root}>
      <Pagination
        page={page}
        count={numberOfPages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            style={{
              background: customTheme.color.primary,
              color: customTheme.color.background,
              opacity: item.page === page ? 0.5 : 1,
            }}
            to={`/posts?page=${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;
