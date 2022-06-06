import { Button, Dialog, Box } from "@mui/material";
import { useEffect, useState } from "react";
import FormAddObject from "./--FORM/FormAddObject";

const OwnHeader = (props) => {
  const [open, setOpen] = useState(false);
  const [libInfo, setLibInfo] = useState({});

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //FETCH LIBRARY INFO
  const fetchLibraryInfo = async () => {
    const data = new FormData();
    data.append("libraryID", props.libraryID);
    data.append("type", 1);
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
  }, []);

  return (
    <>
      <Box>Library Name: {libInfo.Name}</Box>
      <Box>Total Objects: {libInfo.TotalObject}</Box>
      <Button variant="contained" onClick={openHandler}>
        Add New Object
      </Button>
      {/* <Button variant="contained">Edit User</Button>
      <Button variant="contained">Add User</Button> */}

      <Dialog open={open} onClose={closeHandler}>
        <FormAddObject />
      </Dialog>
    </>
  );
};

export default OwnHeader;
