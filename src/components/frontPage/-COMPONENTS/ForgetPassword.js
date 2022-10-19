import { useState, useCallback } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useApiURLContex } from "../../../App";
import LinearProgress from "@mui/material/LinearProgress";

const ForgetPassword = (props) => {
  const { ApiURL } = useApiURLContex();

  const [loadSend, setLoadSend] = useState(false);
  const [loadSendLine, setLoadSendLine] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);
  const incorrectHandler = () => {
    setIncorrect(false);
    setCorrect(false);
    setResetMessage("");
  };
  const fetchSendLink = useCallback(async (event) => {
    setLoadSend(true);
    setLoadSendLine(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fetchUrl = `${ApiURL}/account/forgetPassword.php`;

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
        setCorrect(true);
        setResetMessage("");
      } else if (result === 0) {
        setIncorrect(true);
        setResetMessage("Email Not Found!!");
        setLoadSend(false);
      }
      setLoadSendLine(false);
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <>
      <Box
        component="form"
        onSubmit={fetchSendLink}
        style={{ padding: "10px" }}
      >
        <Box fontWeight="bold" fontSize={23}>
          Enter the Email to reset Password
        </Box>
        <TextField
          helperText={resetMessage}
          margin="normal"
          error={incorrect}
          color={correct ? "success" : ""}
          focused
          type="email"
          required
          fullWidth
          label="Email"
          name="email"
          onChange={incorrectHandler}
        />
        {loadSendLine && <LinearProgress />}
        {correct && (
          <Box
            style={{
              float: "left",
              color: "green",
              fontWeight: "bold",
              marginLeft: "5px",
            }}
          >
            Link Sended to Email!
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          style={{ float: "right" }}
          type="submit"
          disabled={loadSend}
        >
          Send Reset Link
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ float: "right", marginRight: "10px" }}
          onClick={props.closeForm}
          disabled={loadSend}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default ForgetPassword;
