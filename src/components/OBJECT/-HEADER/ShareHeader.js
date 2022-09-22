import { useState, useEffect } from "react";

import { useApiURLContex } from "../../../App";
import { useLibraryContex } from "../ObjectLibrary";
import FormAddObject from "./--FORM/FormAddObject";

import { Button, Box, Dialog } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const ShareHeader = () => {
  const { ApiURL } = useApiURLContex();
  const [open, setOpen] = useState(false);
  const [libInfo, setLibInfo] = useState({});
  const [addable, setAddable] = useState(true);
  const { libraryID, accessLvl } = useLibraryContex();
  const [loadInfo, setLoadInfo] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //FETCH LIBRARY INFO
  const fetchLibraryInfo = async () => {
    setLoadInfo(true);
    const data = new FormData();
    data.append("libraryID", libraryID);
    data.append("type", 2);
    const fetchURL = `${ApiURL}/library/getLibraryInfo.php`;

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
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "DENY") {
        console.log("Access Deny");
        console.log(result);
        setLibInfo({});
      } else {
        setLibInfo(result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadInfo(false);
  };
  useEffect(() => {
    fetchLibraryInfo();
    if (accessLvl > 1) {
      setAddable(false);
    } else {
      setAddable(true);
    }
  }, []);

  return (
    <Box margin="5px">
      {loadInfo && <LinearProgress />}
      <Box
        component={Button}
        fontSize={25}
        border="2px solid #ED431E"
        style={{
          color: "#ED431E",
          display: "inline-block",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
          textTransform: "none",
        }}
      >
        Library:
        <b
          onClick={() => {
            window.location.reload();
          }}
        >
          {libInfo.Name}
        </b>
      </Box>
      <Box
        fontSize={20}
        style={{
          color: "#ED431E",
          border: "2px solid #ED431E",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        Total Objects: <b>{libInfo.TotalObject}</b>
      </Box>
      <Box
        style={{
          color: "#6600ff",
          border: "2px solid #6600ff",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        Owner: <b>{libInfo.FullName}</b>
      </Box>
      <Box
        style={{
          color: "#6600ff",
          border: "2px solid #6600ff",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
          display: "inline-block",
        }}
      >
        Access Level: <b>{accessLvl}</b>
      </Box>
      <Button
        variant="contained"
        onClick={openHandler}
        disabled={addable}
        style={{ float: "right" }}
      >
        Add New Object
      </Button>
      <Dialog open={open} onClose={closeHandler}>
        <FormAddObject />
      </Dialog>
    </Box>
  );
};

export default ShareHeader;
