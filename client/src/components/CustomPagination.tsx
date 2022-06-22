import * as React from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { customTheme } from "../common";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
  },
}));

const CustomPagination = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const classes = useStyles();
  return (
    <Stack spacing={2} className={classes.root}>
      <Pagination
        page={page}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            style={{
              background: customTheme.color.primary,
              color: customTheme.color.background,
              opacity: item.page === page ? 0.5 : 1,
            }}
            to={`/posts${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
};

export default CustomPagination;
