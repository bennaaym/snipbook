import { Box, CircularProgress, Skeleton, Stack } from "@mui/material";
import React from "react";
import { customTheme } from "../common";
import PageContainer from "./PageContainer";

const Loading = () => {
  return (
    <PageContainer>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80%",
          flexWrap: "wrap",
          columnGap: 30,
          rowGap: 20,
        }}
      >
        {/* <CircularProgress style={{ color: customTheme.color.title }} /> */}
        {new Array(12).fill(0).map((_, index) => {
          return (
            <Stack key={index} spacing={1}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="rectangular" width={300} height={118} />
            </Stack>
          );
        })}
      </Box>
    </PageContainer>
  );
};

export default Loading;
