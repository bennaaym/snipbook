import { Fragment, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PageContainer, ProfileBar } from "../../components";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { ProfileActionCreators } from "../../redux/actions-creators";

const useStyles = makeStyles({
  profileContent: {
    paddingLeft: 340,
    height: "100%",
  },
});

const Profile = () => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(ProfileActionCreators.getProfile(Number(id)));
  }, [id, dispatch]);

  return (
    <Fragment>
      <ProfileBar />
      <Box className={classes.profileContent}>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </Box>
    </Fragment>
  );
};

export default Profile;
