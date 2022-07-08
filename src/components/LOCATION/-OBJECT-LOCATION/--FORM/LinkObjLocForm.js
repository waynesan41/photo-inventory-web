import { Box, Button, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCurrentLocationData } from "../../-COMPONENTS/--FETCH/LocationCurrent";

const LinkObjLocForm = (props) => {
  const fetchPlaceObject = (event) => {
    event.preventDefault();
  };
  const { locationInfo } = useCurrentLocationData();
  const { mainID, locationID } = useParams();
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
