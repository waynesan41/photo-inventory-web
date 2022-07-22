import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import EditPlacedObject from "../--FORM/EditPlacedObject";

const PlaceObjectOne = (props) => {
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
        <CardHeader title={props.objData.Name} />
        {props.objData.Photo > 0 && (
          <CardMedia
            component="img"
            height="250"
            image={`http://localhost/PhotoInventory/Backend/api/image/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`}
          />
        )}
        <CardContent>
          Quantity: <b>{props.objData.Quantity}</b>
        </CardContent>
      </CardActionArea>
      <Dialog open={open} onClose={closeDetail} maxWidth="90%">
        <EditPlacedObject objData={props.objData} />
      </Dialog>
    </Card>
  );
};

export default PlaceObjectOne;
