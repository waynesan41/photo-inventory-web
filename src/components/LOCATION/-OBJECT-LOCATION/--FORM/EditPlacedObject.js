import { useState } from "react";
import { Box, Button, Dialog, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCurrentLocationData } from "../../LocationPage";
import { useApiURLContex } from "../../../../App";

const EditPlacedObject = (props) => {
  const { ApiURL } = useApiURLContex();
  const { locationInfo } = useCurrentLocationData();
  const { mainID, locationID } = useParams();
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  //+++++++++++++++++++++++++++++++++++++++++++++
  // API CALL to Link Object and Location
  //++++++++++++++++++++++++++++++++++++++++++++
  const fetchPlaceObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("mainID", mainID);
    data.append("locID", locationID);
    data.append("libID", props.objData.LibraryID);
    data.append("objID", props.objData.ObjectID);
    const fetchURL = `${ApiURL}/objectLocation/editObjLoc.php`;

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
      } else if (result === "UPDATED") {
        window.location.reload();
      } else {
        console.log(result);
        console.log("Fail to Upload");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //+++++++++++++++++++++++++++++++++++++++++++++
  // API CALL to REMOVE Placed Object
  //++++++++++++++++++++++++++++++++++++++++++++
  const fetchRemovePlacedObject = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locID", locationID);
    data.append("libID", props.objData.LibraryID);
    data.append("objID", props.objData.ObjectID);
    const fetchURL = `${ApiURL}/objectLocation/deleteObjLoc.php`;

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
      } else if (result === "REMOVE") {
        window.location.reload();
      } else {
        console.log(result);
        console.log("Fail to Upload");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Box
        component="form"
        style={{ padding: "10px" }}
        onSubmit={fetchPlaceObject}
      >
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box>
            <Box component="b">{props.objData.Name}</Box>
            <Box>LibraryID: {props.objData.LibraryID}</Box>
            <Box>ObjectID: {props.objData.ObjectID}</Box>
            {props.objData.Photo > 0 && (
              <Paper
                style={{ border: "4px solid orange" }}
                component="img"
                height="250"
                src={`${ApiURL}/image/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`}
              />
            )}
          </Box>
          <Box>
            <Box component="b">{locationInfo.Name}</Box>
            <Box>MainID: {mainID}</Box>
            <Box>LocationID: {locationID}</Box>
            {locationInfo.Photo > 0 && (
              <Paper
                style={{ border: "4px solid green" }}
                component="img"
                height="250"
                src={`${ApiURL}/image/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
              />
            )}
          </Box>
        </Box>

        <TextField
          style={{ margin: "10px 0px 5px 0px" }}
          fullWidth
          name="quantity"
          type="number"
          label="Quantity"
          defaultValue={props.objData.Quantity}
          required
        />
        <TextField
          style={{ margin: "10px 0px 5px 0px" }}
          multiline
          variant="outlined"
          name="description"
          fullWidth
          id="description"
          defaultValue={props.objData.Description}
          label="Placement Description"
          rows={4}
        />

        <Box style={{ margin: "10px 0px 10px 0px" }}>
          <Button type="submit" variant="outlined">
            Upadate Placement
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={{ marginLeft: "10px" }}
            onClick={openHandler}
          >
            Remove Object
          </Button>
        </Box>
      </Box>
      <Dialog open={open} onClose={closeHandler}>
        <Box
          component="form"
          style={{ padding: "10px" }}
          onSubmit={fetchRemovePlacedObject}
        >
          <Box
            fontSize={30}
            style={{ marginBottom: "10px", fontWeight: "bolder" }}
          >
            Remove Item from this Location!
          </Box>
          <Box>
            <Button variant="outlined" color="success" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "10px" }}
              type="submit"
            >
              Remove Item
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default EditPlacedObject;
