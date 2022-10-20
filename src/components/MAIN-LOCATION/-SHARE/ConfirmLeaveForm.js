import { useState } from "react";
import { useApiURLContex } from "../../../App";
import { Button, Box, Alert } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const ConfirmLeaveForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadLeave, setLoadLeave] = useState(false);
  //FETCH LEAVE SHARE Library
  const fetchLeaveLibrary = async () => {
    setLoadLeave(true);
    const data = new FormData();
    data.append("mainID", props.mainID);
    const fetchURL = `${ApiURL}/mainLocation/LeaveShareLocation.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "LEAVE") {
        window.location.reload();
      } else {
        console.log("Result: " + result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadLeave(false);
  };
  return (
    <Box style={{ padding: "10px" }}>
      <Alert severity="error">
        Leave This Library will Remove all Access to Library.
      </Alert>
      <Box
        container
        style={{ display: "grid", gridTemplateColumns: "8fr 1fr" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={props.closeConfirm}
          disabled={loadLeave}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          disabled={loadLeave}
          color="error"
          onClick={fetchLeaveLibrary}
        >
          Leave
        </Button>
      </Box>
      {loadLeave && <LinearProgress />}
    </Box>
  );
};

export default ConfirmLeaveForm;
