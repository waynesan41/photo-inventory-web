import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  Link,
} from "@mui/material";
import { useState } from "react";

const LocationOne = (props) => {
  return (
    <Card>
      <Link
        href={`${props.locationData.LocationID}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <CardActionArea>
          <CardHeader title={props.locationData.Name} />
          {props.locationData.Photo > 0 && (
            <CardMedia
              component="img"
              height="250"
              image={`http://localhost/PhotoInventory/Backend/api/image/readImageLocation.php?id1=${props.locationData.MainLocationID}&id2=${props.locationData.LocationID}`}
            />
          )}
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default LocationOne;
