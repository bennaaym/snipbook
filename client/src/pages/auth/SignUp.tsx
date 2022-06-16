import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { makeStyles, withStyles } from "@mui/styles";
import { useFormik } from "formik";
import { customTheme } from "../../common";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { AuthActionCreators } from "../../redux/actions-creators";
import { Link } from "react-router-dom";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },

  formContainer: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "800px",
    width: "80%",
  },

  textField: {
    height: `60px !important`,
  },

  submitButton: {
    background: `${customTheme.color.primary} !important`,
    padding: "10px 0 !important",
  },
});

export const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: customTheme.color.primary,
    },
    "& .MuiInput-underline:after": {
      color: customTheme.color.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        color: customTheme.color.primary,
      },
      "&:hover fieldset": {
        color: customTheme.color.primary,
      },
      "&.Mui-focused fieldset": {
        color: customTheme.color.primary,
        borderColor: customTheme.color.primary,
      },
    },
  },
})(TextField);

const SignUp = () => {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      checked: [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, "First must be 3 characters or more")
        .required("First Name required"),
      lastName: Yup.string()
        .min(3, "Last must be 3 characters or more")
        .required("Last Name required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .required("Password required"),

      checked: Yup.array()
        .length(1, "Please agree on the terms before proceeding")
        .required("Please agree on the terms before proceeding"),
    }),
    onSubmit: ({ firstName, lastName, email, password }) => {
      dispatch(
        AuthActionCreators.signup({
          name: `${firstName} ${lastName}`,
          email,
          password,
        })
      );
    },
  });

  return (
    <Box className={classes.root}>
      <Stack className={classes.formContainer} spacing={2}>
        <Avatar sx={{ bgcolor: customTheme.color.primary }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          height={"100%"}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                InputProps={{
                  style: {
                    padding: 10,
                  },
                }}
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <Typography component="p" mt={2} color="error">
                {formik.errors.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                InputProps={{
                  style: {
                    padding: 10,
                  },
                }}
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <Typography component="p" mt={2} color="error">
                {formik.errors.lastName}
              </Typography>
            </Grid>
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    name="checked"
                    value="privacyPolicyBox"
                    onChange={formik.handleChange}
                  />
                }
                label="I Agree to Privacy Policy."
              />
              <Typography component="p" mt={2} color="error">
                {formik.errors.checked}
              </Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submitButton}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end" mt={2}>
            <Grid item>
              <Link to="/signin" color={customTheme.color.paragraph}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default SignUp;
