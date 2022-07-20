import { useState } from "react";
import { Box, Button, Dialog, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useCurrentLocationData,
  useMainLocationContex,
} from "../../../LocationPage";

const MoveLocationForm = (props) => {
  const { mainType } = useMainLocationContex();
  const { locationInfo } = useCurrentLocationData();
  const { mainID, locationID } = useParams();
  const [open, setOpen] = useState(false);
  const [loopError, setLoopError] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //+++++++++++++++++++++++++++++++++++++++++++++
  // Move Location Fetch
  //++++++++++++++++++++++++++++++++++++++++++++
  const fetchMoveLocation = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("mainID", mainID);
    data.append("locationID", locationID);
    data.append("locType", mainType);
    data.append("topID", props.locData.LocationID);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/location/moveLocation.php",
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
      } else if (result === "LOOP" || result === "FAIL") {
        setLoopError(true);
      } else if (result === "MOVED") {
        window.location.reload();
      } else {
        console.log("Fail to Upload");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Box style={{ padding: "10px" }}>
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box>
            <Box component="b">{locationInfo.Name} === </Box>
            <Box>MainID: {mainID}</Box>
            <Box>LocationID: {locationID}</Box>
            {locationInfo.Photo > 0 && (
              <Paper
                style={{ border: "4px solid green" }}
                component="img"
                height="250"
                src={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
              />
            )}
          </Box>
          <Box>
            <Box component="b">{props.locData.Name}</Box>
            <Box>MainID: {props.locData.MainLocationID}</Box>
            <Box>LocationID: {props.locData.LocationID}</Box>
            {props.locData.Photo > 0 && (
              <Paper
                style={{ border: "4px solid orange" }}
                component="img"
                height="250"
                src={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${props.locData.MainLocationID}&id2=${props.locData.LocationID}`}
              />
            )}
          </Box>
        </Box>

        <Box style={{ margin: "10px 0px 10px 0px" }}>
          <Button variant="outlined" color="error" onClick={props.close}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "10px" }}
            color="success"
            onClick={openHandler}
          >
            Move Location
          </Button>
        </Box>
        <Dialog open={open} onClose={closeHandler}>
          <Box
            component="form"
            style={{ padding: "10px" }}
            onSubmit={fetchMoveLocation}
          >
            <Box fontSize={30}>
              <i>{locationInfo.Name}</i> === <i>{props.locData.Name}</i>
            </Box>
            {loopError && (
              <Box
                style={{ margin: "10px", fontWeight: "bolder", color: "red" }}
              >
                Location Can't be Move to it's SubLocation
              </Box>
            )}
            <Box>
              <Button variant="outlined" onClick={closeHandler}>
                Cancel
              </Button>
              <Button
                color="warning"
                variant="outlined"
                style={{ marginLeft: "10px" }}
                type="submit"
              >
                Move Location
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default MoveLocationForm;
