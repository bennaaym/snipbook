import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { customTheme } from "../common";
import PageContainer from "./PageContainer";

const Loading = () => {
  return (
    <PageContainer>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <CircularProgress style={{ color: customTheme.color.title }} />
      </Box>
    </PageContainer>
  );
};

export default Loading;
