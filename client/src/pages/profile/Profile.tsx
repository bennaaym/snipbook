import { Fragment } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PageContainer, ProfileBar } from "../../components";
import { Outlet } from "react-router-dom";

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
      <ProfileBar name={"marry curry"} />
      <Box className={classes.profileContent}>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Box>
    </Fragment>
  );
};

export default Profile;
