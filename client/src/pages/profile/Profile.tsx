import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";
import { PageContainer, ProfileBar } from "../../components";
import PostForm from "../../components/profile/PostForm";

const useStyles = makeStyles({
  profileContent: {
    paddingLeft: 340,
    height: "100%",
  },
});

const Profile = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <ProfileBar />
      <Box className={classes.profileContent}>
        <PageContainer>
          <PostForm />
        </PageContainer>
      </Box>
    </Fragment>
  );
};

export default Profile;
