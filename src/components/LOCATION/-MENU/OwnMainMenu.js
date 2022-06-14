import { Button, Dialog, Box } from "@mui/material";
import { useEffect, useState } from "react";
const OwnMainMenu = (props) => {
  const [open, setOpen] = useState(false);
  const [mainInfo, setMainInfo] = useState({});

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //FETCH LIBRARY INFO
  const fetchLibraryInfo = async () => {
    const data = new FormData();
    data.append("mainID", props.mainID);
    data.append("type", 1);
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/MainLocation/getMainInfo.php",
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
        setMainInfo({});
      } else {
        setMainInfo(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchLibraryInfo();
  }, []);
  return (
    <Box style={{ display: "inline-block", float: "right" }}>
      <Box>Main Location: {mainInfo.Name}</Box>
      {/* <Box>Total Objects: {mainInfo.TotalObject}</Box> */}
      <Button variant="contained" onClick={openHandler}>
        Add New Location
      </Button>
      {/* <Button variant="contained">Edit User</Button>
  <Button variant="contained">Add User</Button> */}

      <Dialog open={open} onClose={closeHandler}>
        <>Just Form to Add New Location</>
      </Dialog>
    </Box>
  );
};

export default OwnMainMenu;
