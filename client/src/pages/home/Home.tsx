import { Box, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { customTheme } from "../../common";
import { ActionButton, PageContainer } from "../../components";
import homeIllustration from "../../static/images/home_page_illustration.png";

const userStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 100,
  },
  home: {
    display: "flex",
    columnGap: 10,
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
    hight: "100%",
  },

  overCaption: {
    textTransform: "uppercase",
  },
  caption: {
    textTransform: "capitalize",
    letterSpacing: 50,
  },

  right: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  gradient: {
    overflow: "hidden",
    width: "600px",
    height: "500px",
    background:
      "linear-gradient(20deg, rgba(157,93,248,1) 0%, rgba(240,92,239,1) 100%)",

    borderRadius: customTheme.borderRadius.xl,
  },

  homeIllustation: {
    position: "relative",
    top: -110,
    left: 120,
    "&:hover": {
      transform: "scale(1.2)",
      top: -120,
      transition: "transform 1s ease-in-out",
    },
  },
});

const Home = () => {
  const classes = userStyles();
  const navigate = useNavigate();
  return (
    <Fragment>
      <PageContainer>
        <Box className={classes.root}>
          <Box className={classes.home}>
            <Stack spacing={4} className={classes.left}>
              <Typography
                variant="body1"
                component="h6"
                color={customTheme.color.primary}
                fontSize={20}
                fontWeight={800}
                className={classes.overCaption}
              >
                new platform
              </Typography>
              <Typography
                variant="body1"
                component="h1"
                color={customTheme.color.title}
                fontSize={80}
                fontWeight={800}
                maxWidth={600}
                lineHeight={1.2}
                className={classes.caption}
              >
                your next social life
              </Typography>
              <Typography variant="body1" component="p" fontSize={18}>
                share snippets of your life with the world!
              </Typography>
              <ActionButton
                label="get started"
                color={customTheme.color.background}
                backgroundColor={customTheme.color.primary}
                borderRadius={customTheme.borderRadius.md}
                action={() => navigate("/signup")}
                styles={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingTop: 20,
                  paddingBottom: 20,
                  fontSize: 16,
                  width: 300,
                }}
              />
            </Stack>
            <Stack className={classes.right}>
              <Box className={classes.gradient}>
                <img
                  className={classes.homeIllustation}
                  src={homeIllustration}
                  alt="home_illustration"
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </PageContainer>
    </Fragment>
  );
};

export default Home;
