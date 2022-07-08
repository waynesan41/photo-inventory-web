import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import LinkObjLocForm from "../--FORM/LinkObjLocForm";

const ObjectPlaceOne = (props) => {
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
      </CardActionArea>
      <Dialog open={open} onClose={closeDetail}>
        <LinkObjLocForm objData={props.objData} />
      </Dialog>
    </Card>
  );
};

export default ObjectPlaceOne;
