import React from "react";
import { Button } from "@mui/material";
import { account } from "../../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        Crypto Split
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function SignUp(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");
    const name = `${firstName} ${lastName}`;
    // dispatch(authActions.signup({ id: uuidv4(), email, password, name }));
    try {
      // const response = await account.create(uuidv4(), email, password, name);
      const data = dispatch(
        authActions.signup({
          email: email,
          password: password,
          id: uuidv4(),
          name: name,
        })
      );
      dispatch(
        uiActions.setSuccessToast({ message: "Signed Up Successfully!" })
      );
      dispatch(uiActions.showSuccessToast());
    } catch (e) {
      console.log(e);
      dispatch(uiActions.setFailureToast({ message: e.message }));
      dispatch(uiActions.showFailureToast());
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={submitHandler}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Link to="/sign-in" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
export default SignUp;
