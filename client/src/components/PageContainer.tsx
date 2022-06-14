import { Fragment, ReactNode } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../common";

const useStyles = makeStyles({
  root: {
    paddingLeft: `${customTheme.pagePadding}% !important`,
    paddingRight: `${customTheme.pagePadding}% !important`,
  },
});

interface IPageContainer {
  children: ReactNode;
  load?: boolean;
  noPadding?: boolean;
}

const PageContainer: React.FC<IPageContainer> = ({
  children,
  load,
  noPadding,
}: IPageContainer) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Box className={classes.root}>{children}</Box>
    </Fragment>
  );
};

export default PageContainer;
