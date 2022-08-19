import React, { useState } from "react";
import { useApiURLContex } from "../../../../App";
import { Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const CancelRequest = (props) => {
  const { ApiURL } = useApiURLContex();
  const [loadCancel, setLoadCancel] = useState(false);
  const cancelFetch = async () => {
    setLoadCancel(true);
    const formData = new FormData();
    formData.append("userID", props.currentID);
    formData.append("update", "C");
    const fetchURL = `${ApiURL}/connection/updateConnection.php`;
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "CANCEL") {
        props.close(null);
      } else {
        window.location.reload();
      }
      setLoadCancel(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Button
        variant="contained"
        disabled={loadCancel}
        color="error"
        onClick={cancelFetch}
      >
        Cancel Request
      </Button>
      {loadCancel && <LinearProgress />}
    </>
  );
};

export default CancelRequest;
