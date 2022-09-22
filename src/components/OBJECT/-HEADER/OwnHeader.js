import { useEffect, useState } from "react";

import { useApiURLContex } from "../../../App";
import FormAddObject from "./--FORM/FormAddObject";

import { Button, Dialog, Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const OwnHeader = (props) => {
  const { ApiURL } = useApiURLContex();
  const [open, setOpen] = useState(false);
  const [libInfo, setLibInfo] = useState({});
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
    data.append("libraryID", props.libraryID);
    data.append("type", 1);
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

      // console.log(result);
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result == "DENY") {
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
  }, []);

  return (
    <>
      {loadInfo && <LinearProgress />}
      <Box margin="5px">
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
        <Button
          variant="contained"
          onClick={openHandler}
          style={{ float: "right" }}
        >
          Add New Object
        </Button>
      </Box>

      <Dialog open={open} onClose={closeHandler}>
        <FormAddObject />
      </Dialog>
    </>
  );
};

export default OwnHeader;
