import {
  Drawer,
  Toolbar,
  Box,
  CssBaseline,
  Divider,
  List,
  Typography,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AddBox, Panorama, ThumbUpAlt, Visibility } from "@mui/icons-material";
import userAvatar from "../../static/images/user_avatar.jpg";
import { customTheme } from "../../common";
import ProfileBarItem from "./ProfileBarItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { useAuth } from "../../hooks";

const DRAWER_WIDTH = 340;

const useStyles = makeStyles({
  toolbar: {
    padding: "0 !important",
  },

  imgContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 0 10px 0",
  },

  userAvatar: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
  },

  userName: {
    color: customTheme.color.title,
    textTransform: "capitalize",
    textAlign: "center",
    padding: 10,
  },

  quoteContainer: {
    padding: "40px 20px",
  },

  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px 0",
  },

  stats: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const ProfileBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { data: auth } = useAuth();
  const profile = useSelector((state: RootState) => state.profile);

  return (
    <Box>
      <CssBaseline />
      <Box component="nav" aria-label="mailbox folders">
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          <Toolbar className={classes.toolbar}>
            <Stack sx={{ flex: 1 }}>
              <Box className={classes.imgContainer}>
                <img
                  src={userAvatar}
                  alt="user_avatar"
                  className={classes.userAvatar}
                />
              </Box>
              <Typography
                variant="h6"
                component="h6"
                fontSize={24}
                fontWeight={700}
                className={classes.userName}
              >
                {profile.name}
              </Typography>
            </Stack>
          </Toolbar>

          <Divider />

          <Box className={classes.quoteContainer}>
            <Typography
              variant="body1"
              component="blockquote"
              fontSize={16}
              fontStyle="italic"
              textAlign="center"
            >
              Do not follow where the path may lead. Go instead where there is
              no path and leave a trail
            </Typography>
          </Box>

          <Divider />

          <Box className={classes.statsContainer}>
            <Box className={classes.stats}>
              <ThumbUpAlt
                fontSize="medium"
                sx={{ color: customTheme.color.paragraph }}
              />
              <Typography>Likes {profile.totalLikes}</Typography>
            </Box>
            <Box className={classes.stats}>
              <Visibility
                fontSize="medium"
                sx={{ color: customTheme.color.paragraph }}
              />
              <Typography>Views 0</Typography>
            </Box>
          </Box>

          <Divider />

          {profile.id === auth?.user?.id && (
            <List>
              <ProfileBarItem
                label="new post"
                icon={<AddBox sx={{ color: customTheme.color.paragraph }} />}
                action={() => {
                  navigate(`/profile/${auth?.user?.id}/post/create`);
                }}
              />
              <ProfileBarItem
                label="my posts"
                icon={<Panorama sx={{ color: customTheme.color.paragraph }} />}
                action={() => {
                  navigate(`/profile/${auth?.user?.id}`);
                }}
              />
            </List>
          )}
        </Drawer>
      </Box>
    </Box>
  );
};

export default ProfileBar;
