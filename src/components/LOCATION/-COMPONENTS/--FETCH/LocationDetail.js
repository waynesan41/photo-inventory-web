import { Box, Button, Dialog, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useApiURLContex } from "../../../../App";
import { useMainLocationContex } from "../../LocationPage";
const LocationDetail = (props) => {
  const { ApiURL } = useApiURLContex();
  const { mainType, accessLvl } = useMainLocationContex();

  const [src, setSrc] = useState("");

  useEffect(() => {
    /* if (mainType == 2) {
      if (accessLvl == 3) setEdit(false);
      else setEdit(true);
    } else {
      setEdit(false);
    } */
    if (props.locData.Photo != 0) {
      setSrc(
        `${ApiURL}/image/readOgImageLocation.php?id1=${props.locData.MainLocationID}&id2=${props.locData.LocationID}`
      );
    }
  }, []);

  return (
    <Box minWidth={350} style={{ padding: "10px" }}>
      <Box fontSize={25}>
        <b>{props.locData.Name}</b>
      </Box>
      <b>LocationID: {props.locData.LocationID}</b>
      <Box style={{ margin: "5px 0px 5px 0px" }}></Box>
      <Box>
        <img style={{ maxWidth: "500px" }} src={src} />
      </Box>
      <Typography>
        Description: <br />
        {props.locData.Description}
      </Typography>
    </Box>
  );
};

export default LocationDetail;
