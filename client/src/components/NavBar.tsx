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
  styled,
  alpha,
  InputBase,
} from "@mui/material";
import { AccountBox, Logout, Search as SearchIcon } from "@mui/icons-material";
import ActionButton from "./ActionButton";
import { makeStyles } from "@mui/styles";
import { customTheme } from "../common";
import { useAuth } from "../hooks";
import userAvatar from "../static/images/user_avatar.jpg";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  AuthActionCreators,
  PostActionCreators,
} from "../redux/actions-creators";

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
  const navigate = useNavigate();
  const { data: auth } = useAuth();
  const dispatch: Dispatch<any> = useDispatch();
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
        <Link to={`profile/${auth?.user?.id}`} className={classes.link}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            dispatch(AuthActionCreators.signout(() => navigate("/signin")));
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  borderRadius: customTheme.borderRadius.xl,
  backgroundColor: alpha(customTheme.color.paragraph, 0.5),
  padding: "5px 0",
  "&:hover": {
    backgroundColor: alpha(customTheme.color.paragraph, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { data: auth } = useAuth();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const [search, setSearch] = useState("");

  const handleSearch = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.keyCode !== 13) return;
    if (!search) return;
    const query = `tags=${search.replace(" ", ",")}`;
    dispatch(PostActionCreators.getPostBySearch(query, navigate));
    setSearch("");
  };

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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={handleSearch}
                  value={search}
                />
              </Search>
            </li>
            <li>
              <Link to="/posts" className={classes.link}>
                Posts
              </Link>
            </li>
            <li>
              {!auth?.accessToken ? (
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
