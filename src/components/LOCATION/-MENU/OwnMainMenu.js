import { Button, Dialog, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewLocationForm from "../-COMPONENTS/--FORM/NewLocationForm";
const OwnMainMenu = (props) => {
  let { locationID } = useParams(); // Value from URL
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
      if (result === 0) {
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
    <Box>
      <Box
        component={Button}
        fontSize={20}
        color="#259c3f"
        border="2px solid #259c3f"
        style={{
          display: "inline-block",
          margin: "5px",
          padding: "5px",
          borderRadius: "10px",
          textTransform: "none",
        }}
        onClick={() => {
          window.location.reload();
        }}
      >
        Main Location:
        <b>{mainInfo.Name}</b>
      </Box>

      <Button
        variant="contained"
        onClick={openHandler}
        style={{ margin: "10px", float: "right" }}
      >
        Add New Location
      </Button>

      <Dialog open={open} onClose={closeHandler}>
        <NewLocationForm topID={locationID} close={closeHandler} />
      </Dialog>
    </Box>
  );
};

export default OwnMainMenu;
