import { Fragment, ReactNode } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PageContainer, ProfileBar } from "../../components";

const useStyles = makeStyles({
  profileContent: {
    paddingLeft: 340,
    height: "100%",
  },
});

interface IProps {
  children: ReactNode;
}

const Profile: React.FC<IProps> = ({ children }: IProps) => {
  const classes = useStyles();
  return (
    <Fragment>
      <ProfileBar />
      <Box className={classes.profileContent}>
        <PageContainer>{children}</PageContainer>
      </Box>
    </Fragment>
  );
};

export default Profile;
