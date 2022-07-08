import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
  CardContent,
} from "@mui/material";
import { useState } from "react";

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
            image={`http://localhost/PhotoInventory/Backend/api/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`}
          />
        )}
        <CardContent>
          Quantity: <b>{props.objData.Quantity}</b>
        </CardContent>
      </CardActionArea>
      <Dialog open={open} onClose={closeDetail}>
        <>Object Detail</>
      </Dialog>
    </Card>
  );
};

export default PlaceObjectOne;
