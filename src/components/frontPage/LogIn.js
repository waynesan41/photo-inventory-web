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

export default function SignIn() {
  const [incorrect, setIncorrect] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const incorrectHandler = () => {
    setIncorrect(false);
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/account/login.php",
        {
          method: "POST",
          body: data,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 1) {
        window.location = window.location.origin + "/Profile";
      } else if (result === 0) {
        setIncorrect(true);
        setLoginMessage("Incorrect Username, Email or Password!");
      }
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
            // defaultValue="health77"
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
            defaultValue="qwerR`qwe12"
            onChange={incorrectHandler}
            helperText={loginMessage}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
