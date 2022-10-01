import React from "react";
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from "../../static/undraw_crypto_portfolio_2jy5.svg";
import { motion } from "framer-motion";

const theme = createTheme();

function Landing(props) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h2"
                sx={{ marginTop: "10vh" }}
              >
                CRYPTO - SPLIT
              </Typography>

              <Typography variant="body 2" sx={{ marginTop: "5vh" }}>
                Multi-Sig wallet for your loved ones allowing to take financial
                decision together and discuss at one platform together.
              </Typography>
              <Box component="form" noValidate sx={{ mt: 5 }}>
                <Button
                  component={Link}
                  // fullWidth
                  to={"/sign-up"}
                  // sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                >
                  Sign Up
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <Button component={Link} to={"/sign-up"} variant="contained">
        Sign Up
      </Button>
      <Button
        sx={{ marginLeft: "20px" }}
        component={Link}
        to={"/sign-in"}
        variant="contained"
      >
        Sign In
      </Button> */}
    </>
  );
}

export default Landing;
