import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import { useApiURLContex } from "../../../App";
import ObjectDetail from "./ObjectDetail";

const ObjectOne = (props) => {
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
        <CardHeader title={props.objData.Name} />
        {props.objData.Photo > 0 && (
          <CardMedia
            component="img"
            height="250"
            image={`${ApiURL}/image/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`}
          />
        )}
      </CardActionArea>
      <Dialog open={open} onClose={closeDetail}>
        <ObjectDetail objData={props.objData} />
      </Dialog>
    </Card>
  );
};

export default ObjectOne;
