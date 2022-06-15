import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { PageContainer, ProfileBar } from "../../components";
import PostForm from "../../components/profile/PostForm";
import { ProfileComponent } from "../../redux/actions/profile";
import { RootState } from "../../redux/reducers";

const useStyles = makeStyles({
  profileContent: {
    paddingLeft: 340,
    height: "100%",
  },
});

const Profile = () => {
  const { profile } = useSelector((state: RootState) => state);
  const classes = useStyles();
  return (
    <Fragment>
      <ProfileBar />
      <Box className={classes.profileContent}>
        <PageContainer>
          {profile?.component === ProfileComponent.CREATE_FORM && <PostForm />}
        </PageContainer>
      </Box>
    </Fragment>
  );
};

export default Profile;
