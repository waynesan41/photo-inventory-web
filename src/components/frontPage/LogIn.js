import React, { useCallback, useState } from "react";

import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useApiURLContex } from "../../App";

import LinearProgress from "@mui/material/LinearProgress";
import { Dialog } from "@mui/material";
import ForgetPassword from "./-COMPONENTS/ForgetPassword";

export default function SignIn() {
  const { ApiURL } = useApiURLContex();
  const [incorrect, setIncorrect] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const [loadLogin, setLoadLogin] = useState(false);
  const [openForget, setOpenForget] = useState(false);

  const openForgetHandler = () => {
    setOpenForget(true);
  };
  const closeForgetHandler = () => {
    setOpenForget(false);
  };

  const incorrectHandler = () => {
    setIncorrect(false);
  };

  const handleSubmit = useCallback(async (event) => {
    setLoadLogin(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchUrl = `${ApiURL}/account/login.php`;

    /* for (const pair of data.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    } */
    console.log(data.get("remember"));
    if (data.get("remember") == undefined) {
      data.append("remember", 0);
    }
    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      console.log(result);
      if (result === 1) {
        window.location = window.location.origin + "/Profile";
      } else if (result === 0) {
        setIncorrect(true);
        setLoginMessage("Incorrect Username, Email or Password!");
      }
      setLoadLogin(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  /* const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("login"),
      password: data.get("password"),
    });

    logInHttp();
  }; */

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            error={incorrect}
            required
            fullWidth
            label="Email or Username"
            name="login"
            onChange={incorrectHandler}
          />
          <TextField
            margin="normal"
            error={incorrect}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={incorrectHandler}
            helperText={loginMessage}
          />
          <FormControlLabel
            control={<Checkbox name="remember" value={1} color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loadLogin}
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          {loadLogin && <LinearProgress />}
        </Box>
        <Grid container>
          <Grid item xs>
            <Link onClick={openForgetHandler} variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
        <Dialog
          open={openForget}
          onClose={closeForgetHandler}
          maxWidth="sm"
          fullWidth
        >
          <ForgetPassword closeForm={closeForgetHandler} />
        </Dialog>
      </Box>
    </Container>
  );
}
