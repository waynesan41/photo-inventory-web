import { useEffect, useState } from "react";

import { Box, Button, Dialog, Paper, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useParams } from "react-router-dom";
import {
  useCurrentLocationData,
  useMainLocationContex,
} from "../../LocationPage";
import { useApiURLContex } from "../../../../App";

const EditPlacedObject = (props) => {
  const { ApiURL } = useApiURLContex();
  const { locationInfo } = useCurrentLocationData();
  const { mainType, accessLvl } = useMainLocationContex();
  const { mainID, locationID } = useParams();
  const [editAccess, setEditAccess] = useState(false);
  const [loadEdit, setLoadEdit] = useState(false);
  const [loadRemove, setLoadRemove] = useState(false);

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
    setLoadEdit(true);
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
        window.location.href = window.location.href;
      } else {
        console.log(result);
        console.log("Fail to Upload");
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadEdit(false);
  };
  //+++++++++++++++++++++++++++++++++++++++++++++
  // API CALL to REMOVE Placed Object
  //++++++++++++++++++++++++++++++++++++++++++++
  const fetchRemovePlacedObject = async (event) => {
    setLoadRemove(true);
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
    setLoadRemove(false);
  };
  useEffect(() => {
    if (mainType == 2) {
      if (accessLvl == 3) setEditAccess(false);
      else setEditAccess(true);
    } else {
      setEditAccess(false);
    }
  }, []);
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
            <Box style={{ fontWeight: "bold" }}>{props.objData.Name}</Box>
            {/* <Box>LibraryID: {props.objData.LibraryID}</Box> */}
            {/* <Box>ObjectID: {props.objData.ObjectID}</Box> */}
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
            <Box style={{ fontWeight: "bold" }}>{locationInfo.Name}</Box>
            {/* <Box>MainID: {mainID}</Box> */}
            {/* <Box>LocationID: {locationID}</Box> */}
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
          disabled={editAccess}
          required
        />
        <Box display>
          <Box display="inline">
            Editor: <b>{props.objData.FullName}</b>
          </Box>
          <Box style={{ display: "inline", float: "right" }}>
            Last Update: {props.objData.LastUpdate}
          </Box>
        </Box>

        <TextField
          style={{ margin: "10px 0px 5px 0px" }}
          multiline
          variant="outlined"
          name="description"
          fullWidth
          id="description"
          defaultValue={props.objData.Description}
          label="Placement Description"
          disabled={editAccess}
          rows={4}
        />

        <Box style={{ margin: "10px 0px 10px 0px" }}>
          <Button
            type="submit"
            disabled={loadEdit || editAccess}
            variant="outlined"
          >
            Upadate Placement
          </Button>
          <Button
            variant="outlined"
            color="error"
            style={{ marginLeft: "10px" }}
            onClick={openHandler}
            disabled={loadEdit || editAccess}
          >
            Remove Object
          </Button>
        </Box>
        {loadEdit && <LinearProgress />}
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
            <Button
              variant="outlined"
              disabled={loadRemove}
              color="success"
              onClick={closeHandler}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "10px" }}
              type="submit"
              disabled={loadRemove}
            >
              Remove Item
            </Button>
          </Box>
          {loadRemove && <LinearProgress />}
        </Box>
      </Dialog>
    </>
  );
};

export default EditPlacedObject;
