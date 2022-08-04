import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Link,
} from "@mui/material";
import { useApiURLContex } from "../../../App";

const OneLocation = (props) => {
  const { ApiURL } = useApiURLContex();
  return (
    <Card style={{ border: "2px solid green" }}>
      <Link
        href={`/mainLocation/${props.locationData.MainLocationID}/${props.locationData.LocationID}`}
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

export default OneLocation;
