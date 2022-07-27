import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useApiURLContex } from "../../../../App";

const LocationOne = (props) => {
  const { ApiURL } = useApiURLContex();

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
              image={`${ApiURL}/image/readImageLocation.php?id1=${props.locationData.MainLocationID}&id2=${props.locationData.LocationID}`}
            />
          )}
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default LocationOne;
