import { Button, Box, Dialog } from "@mui/material";

import { useState, useEffect } from "react";
import { useLibraryContex } from "../ObjectLibrary";

import FormAddObject from "./--FORM/FormAddObject";

const ShareHeader = () => {
  const [object, setObject] = useState([]);
  const [open, setOpen] = useState(false);
  const [libInfo, setLibInfo] = useState({});
  const [addable, setAddable] = useState(true);
  const { libraryID, libType, accessLvl } = useLibraryContex();

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //FETCH LIBRARY INFO
  const fetchLibraryInfo = async () => {
    const data = new FormData();
    data.append("libraryID", libraryID);
    data.append("type", 2);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/library/getLibraryInfo.php",
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

      console.log(result);
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
    <>
      <Box>Library name: {libInfo.Name}</Box>
      <Box>Owner: {libInfo.FullName}</Box>
      <Box>Total Objects: {libInfo.TotalObject}</Box>
      <Box>Access Level: {accessLvl}</Box>
      <Button variant="contained" onClick={openHandler} disabled={addable}>
        Add Object
      </Button>
      <Dialog open={open} onClose={closeHandler}>
        <FormAddObject />
      </Dialog>
    </>
  );
};

export default ShareHeader;
