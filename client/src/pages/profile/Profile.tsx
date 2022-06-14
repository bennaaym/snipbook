import { Box } from "@mui/material";
import { Fragment } from "react";
import { ProfileBar } from "../../components";
import PostForm from "../../components/profile/PostForm";

const Profile = () => {
  return (
    <Fragment>
      <ProfileBar />
      <Box style={{ paddingLeft: 400, paddingTop: 50 }}>
        <PostForm />
      </Box>
    </Fragment>
  );
};

export default Profile;
