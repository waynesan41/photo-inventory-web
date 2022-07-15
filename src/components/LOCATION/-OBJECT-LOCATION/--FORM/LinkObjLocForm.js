import { Box, Button, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCurrentLocationData } from "../../LocationPage";

const LinkObjLocForm = (props) => {
  const { locationInfo } = useCurrentLocationData();
  const { mainID, locationID } = useParams();

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
    if (data.get("description").length == 0) {
      data.delete("description");
    }

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/objectLocation/addObjLoc.php",
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

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "PLACED") {
        window.location.reload();
      } else if (result === "FAIL") {
        window.location.reload();
      } else {
        console.log("Fail to Upload");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      component="form"
      style={{ padding: "5px" }}
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
              src={`http://localhost/PhotoInventory/Backend/api/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`}
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
              src={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${mainID}&id2=${locationID}`}
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
        required
      />
      <TextField
        style={{ margin: "10px 0px 5px 0px" }}
        multiline
        variant="outlined"
        name="description"
        fullWidth
        id="description"
        label="Placement Description"
        rows={4}
      />
      <Button type="submit" variant="outlined">
        Place Object
      </Button>
    </Box>
  );
};

export default LinkObjLocForm;
