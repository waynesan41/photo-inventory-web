import { Breadcrumbs, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LocationBread = () => {
  let { mainID, locationID } = useParams();
  const [breadList, setBreadList] = useState([]);
  const fetchBread = async () => {
    const data = new FormData();
    data.append("mainID", mainID);
    data.append("locationID", locationID);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Location/getBread.php",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "FAIL") {
        setBreadList([]);
      } else {
        setBreadList([...result]);
      }
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (locationID != 0) fetchBread();
  }, []);
  return (
    <>
      LocationID: {locationID} MainID: {mainID}
      <Breadcrumbs separator=">" arial-label="breadcrumb">
        <Link href={0}>Home</Link>
        {breadList.map((loc) => (
          <Link key={loc.LocationID} href={`${loc.LocationID}`}>
            {loc.Name}
          </Link>
        ))}
      </Breadcrumbs>
    </>
  );
};

export default LocationBread;
