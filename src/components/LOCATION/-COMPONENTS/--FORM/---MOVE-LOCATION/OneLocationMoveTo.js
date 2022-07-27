import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
} from "@mui/material";
import MoveLocationForm from "./MoveLocationFrom";
import { useApiURLContex } from "../../../../../App";
const OneLocationMoveTo = (props) => {
  const { ApiURL } = useApiURLContex();
  const [open, setOpen] = useState(false);

  const openDetail = () => {
    setOpen(true);
  };
  const closeDetail = () => {
    setOpen(false);
  };

  return (
    <Card>
      <CardActionArea onClick={openDetail}>
        <CardHeader title={props.locationData.Name} />
        {props.locationData.Photo > 0 && (
          <CardMedia
            component="img"
            height="250"
            image={`${ApiURL}/image/readImageLocation.php?id1=${props.locationData.MainLocationID}&id2=${props.locationData.LocationID}`}
          />
        )}
      </CardActionArea>

      <Dialog open={open} onClose={closeDetail}>
        <MoveLocationForm locData={props.locationData} close={closeDetail} />
      </Dialog>
    </Card>
  );
};

export default OneLocationMoveTo;
