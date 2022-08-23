import { useState } from "react";
import { useApiURLContex } from "../../../App";

import { Box, Button, Alert } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const DeleteConfirm = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadDelete, setLoadDelete] = useState(false);
  const fetchDelete = async () => {
    setLoadDelete(true);
    const data = new FormData();
    data.append("libraryID", props.libraryID);
    data.append("libType", props.libType);
    data.append("objectID", props.objectID);
    const fetchURL = `${ApiURL}/object/deleteObject.php`;

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
      console.log(result);
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "DELETED") {
        window.location.reload();
      } else {
        console.log("Fail to DELETE");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadDelete(false);
  };

  return (
    <Box minWidth={350} padding={1}>
      <Alert severity="warning">
        The Object will be Deleted Including Image!
      </Alert>

      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gridGap: "5px",
        }}
      >
        <Box>
          <Button
            onClick={props.close}
            disabled={loadDelete}
            fullWidth
            variant="contained"
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={fetchDelete}
            disabled={loadDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
      {loadDelete && <LinearProgress />}
    </Box>
  );
};

export default DeleteConfirm;
