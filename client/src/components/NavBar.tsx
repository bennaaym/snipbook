import { Fragment, useState, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
} from "@mui/material";
import { AccountBox, AccountCircle, Logout } from "@mui/icons-material";
import ActionButton from "./ActionButton";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../common";
import { useAuth } from "../hooks";
import userAvatar from "../static/images/user_avatar.jpg";

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

const NavMenu = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button onClick={handleClick}>
        <Avatar alt="user_avatar" src={userAvatar} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        disableScrollLock={true}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to="/profile/posts" className={classes.link}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>

        <Link to="/profile/posts" className={classes.link}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: auth } = useAuth();

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
              {!auth?.user ? (
                <ActionButton
                  label={"sign in"}
                  color={customTheme.color.background}
                  backgroundColor={customTheme.color.primary}
                  borderRadius={customTheme.borderRadius.md}
                  action={() => navigate("/signin")}
                />
              ) : (
                <NavMenu />
              )}
            </li>
          </ul>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};

export default NavBar;
