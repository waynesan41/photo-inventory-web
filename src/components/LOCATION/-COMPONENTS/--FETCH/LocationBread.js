import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiURLContex } from "../../../../App";

import { Box, Breadcrumbs, Link } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const LocationBread = () => {
  const { ApiURL } = useApiURLContex();
  let { mainID, locationID } = useParams();
  const [breadList, setBreadList] = useState([]);
  const [loadBread, setLoadBread] = useState(false);
  const fetchBread = async () => {
    setLoadBread(true);
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locationID", locationID);
    const fetchURL = `${ApiURL}/location/getBread.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "FAIL") {
        setBreadList([]);
      } else {
        setBreadList([...result.reverse()]);
      }
      // console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    setLoadBread(false);
  };
  useEffect(() => {
    if (locationID != 0) fetchBread();
  }, []);
  return (
    <Box margin="10px" display="block">
      <Breadcrumbs separator=">" arial-label="breadcrumb">
        <Link
          href={0}
          style={{
            border: "2px solid green",
            borderRadius: "5px",
            padding: "5px",
          }}
        >
          Home
        </Link>
        {breadList.map((loc) => (
          <Link
            key={loc.LocationID}
            href={`${loc.LocationID}`}
            style={{
              border: "2px solid green",
              borderRadius: "5px",
              padding: "5px",
            }}
          >
            {loc.Name}
          </Link>
        ))}
      </Breadcrumbs>
      {loadBread && <LinearProgress />}
    </Box>
  );
};

export default LocationBread;
