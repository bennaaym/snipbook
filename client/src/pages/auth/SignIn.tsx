import { Avatar, Button, Grid, Box, Typography, Stack } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { customTheme } from "../../common";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AuthActionCreators } from "../../redux/actions-creators";
import { CustomTextField, useStyles } from "./SignUp";
import { Link } from "react-router-dom";

const SignUp = () => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password required"),
    }),
    onSubmit: (values) => {
      dispatch(AuthActionCreators.signin(values));
    },
  });

  return (
    <Box className={classes.root}>
      <Stack className={classes.formContainer} spacing={2}>
        <Avatar sx={{ bgcolor: customTheme.color.primary }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          height={"100%"}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <CustomTextField
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                InputProps={{
                  style: {
                    padding: 10,
                  },
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <Typography component="p" mt={2} color="error">
                  {formik.errors.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                InputProps={{
                  style: {
                    padding: 10,
                  },
                }}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Typography component="p" mt={2} color="error">
                {formik.errors.password}
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end" mt={2}>
            <Grid item>
              <Link to="/signup" color={customTheme.color.paragraph}>
                Already have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default SignUp;
