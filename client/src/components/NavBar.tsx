import React, { Fragment } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";

const useStyles = makeStyles({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
    background: customTheme.color.background,
    paddingLeft: `${customTheme.pagePadding}% !important`,
    paddingRight: `${customTheme.pagePadding}% !important`,
    paddingTop: customTheme.pagePadding * 2,
  },
  logo: {
    textTransform: "capitalize",
  },
  items: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    columnGap: 50,
    fontSize: 16,
    fontWeight: 600,
  },
  link: {
    textDecoration: "none",
    color: customTheme.color.paragraph,
  },
});

// list of routes where we don't want to display the Navigation bar
const excludedRouted = ["/profile"];

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (excludedRouted.includes(pathname)) return <></>;

  return (
    <Fragment>
      <AppBar position="fixed" elevation={0}>
        <Toolbar className={classes.toolBar}>
          <Box>
            <Link to="/" className={classes.link}>
              <Typography
                className={classes.logo}
                color={customTheme.color.paragraph}
                fontSize={24}
                fontWeight={800}
                padding={0}
                margin={0}
              >
                snipbook
              </Typography>
            </Link>
          </Box>
          <ul className={classes.items}>
            <li>
              <Link to="/posts" className={classes.link}>
                Posts
              </Link>
            </li>
            <li>
              <ActionButton
                label={"sign up"}
                color={customTheme.color.background}
                backgroundColor={customTheme.color.primary}
                borderRadius={customTheme.borderRadius.md}
                action={() => navigate("/signup")}
              />
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default NavBar;
