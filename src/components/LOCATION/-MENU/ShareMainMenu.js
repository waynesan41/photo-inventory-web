import { Button, Dialog, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewLocationForm from "../-COMPONENTS/--FORM/NewLocationForm";
import { useMainLocationContex } from "../LocationPage";
const ShareMainMenu = (props) => {
  const { mainType, accessLvl } = useMainLocationContex();
  let { mainID, locationID } = useParams(); // Value from URL
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
    data.append("type", 2);
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
      console.log("Share Main Fetch");

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
      <Box>
        Main Location: <b>{mainInfo.Name}</b>
      </Box>
      <Box>
        Access Lvl: <b>{accessLvl}</b>
      </Box>
      <Box>
        Total Objects:
        {mainInfo.TotalObjectType}
      </Box>
      <Box>
        Total Locations: <b>{mainInfo.TotalLocation}</b>
      </Box>
      <Box>
        Owner Name:
        <b>{mainInfo.FullName}</b>
      </Box>
      <Box>Owner Username: {mainInfo.Username}</Box>

      <Button
        variant="contained"
        onClick={openHandler}
        disabled={accessLvl < 2}
      >
        Add New Location
      </Button>
      {/* <Button variant="contained">Edit User</Button>
  <Button variant="contained">Add User</Button> */}

      <Dialog open={open} onClose={closeHandler}>
        <NewLocationForm topID={locationID} close={closeHandler} />
      </Dialog>
    </Box>
  );
};

export default ShareMainMenu;
