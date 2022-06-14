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
  const [open, setOpen] = useState(false);

  const openDetail = () => {
    setOpen(true);
  };
  const closeDetail = () => {
    setOpen(false);
  };
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
              image={`http://localhost/PhotoInventory/Backend/api/readImageLocation.php?id1=${props.locationData.MainLocationID}&id2=${props.locationData.LocationID}`}
            />
          )}
        </CardActionArea>
      </Link>
      <Dialog open={open} onClose={closeDetail}>
        <>This is Form</>
      </Dialog>
    </Card>
  );
};

export default LocationOne;
