import { Button, Box, Alert } from "@mui/material";

const ConfirmLeaveForm = (props) => {
  //FETCH LEAVE SHARE Library
  const fetchLeaveLibrary = async () => {
    const data = new FormData();
    data.append("libraryID", props.libraryID);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Library/leaveShareLibrary.php",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
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
  };
  return (
    <Box minWidth={350} style={{ padding: "10px" }}>
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
        >
          Cancel
        </Button>
        <Button variant="outlined" color="error" onClick={fetchLeaveLibrary}>
          Leave
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmLeaveForm;
