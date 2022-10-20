import React, { useContext, useEffect, useState } from "react";

import { Box, Button, Dialog, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import NewMainLocationForm from "./-NEWMAIN/NewMainLocationForm";
import OwnMainLocationOne from "./-OWN/OwnMainLocationOne";
import ShareMainLocationOne from "./-SHARE/ShareMainLocationOne";
import { useApiURLContex } from "../../App";

const ChangePeopleContex = React.createContext();
export const useChangePeople = () => {
  return useContext(ChangePeopleContex);
};

const MainLocationList = () => {
  const { ApiURL } = useApiURLContex();
  const [ownLibrary, setOwnLibrary] = useState([]);
  const [shareLibrary, setShareLibrary] = useState([]);

  const [loadShare, setLoadShare] = useState(false);
  const [loadOwn, setLoadOwn] = useState(false);

  const [open, setOpen] = useState(false);

  const openHandler = (type) => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const changeTotalPeople = (id, ps) => {
    const items = ownLibrary.filter((lib) => {
      if (lib.MainLocationID === id) {
        if (ps === 1) lib.NumPeople++;
        else if (ps === 2) lib.NumPeople--;
      }
      return lib;
    });
    setOwnLibrary([...items]);
  };

  const fetchLibrary = async (libType) => {
    if (libType === 1) {
      setLoadOwn(true);
    } else {
      setLoadShare(true);
    }
    const formData = new FormData();
    formData.append("mainLocation", libType);
    const fetchURL = `${ApiURL}/mainLocation/getMainLocation.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else {
        if (libType === 1) {
          if (result === "NO LOCATION") setOwnLibrary([]);
          else setOwnLibrary([...result]);
        } else if (libType === 2) {
          if (result === "NO SHARE LOCATION") setShareLibrary([]);
          else setShareLibrary([...result]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    if (libType === 1) {
      setLoadOwn(false);
    } else {
      setLoadShare(false);
    }
  };

  useEffect(() => {
    if (window.location.pathname !== "/MainLocation") {
      window.location = window.location.origin + "/MainLocation";
    }

    fetchLibrary(1);
    fetchLibrary(2);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} md={6}>
        <Box fontSize={30} display="inline" margin="0px 0px 5px 5px">
          Own Main Location
        </Box>
        <Button
          variant="contained"
          onClick={openHandler}
          style={{ display: "inline", marginRight: "10px", float: "right" }}
        >
          Add New Main Location
        </Button>
        {loadOwn && <LinearProgress />}
        <ChangePeopleContex.Provider value={changeTotalPeople}>
          <Grid container spacing={1} padding="5px">
            {ownLibrary.map((lib) => (
              <Grid item xs={12} sm={12} md={6} key={lib.MainLocationID}>
                <OwnMainLocationOne mainData={lib} />
              </Grid>
            ))}
          </Grid>
        </ChangePeopleContex.Provider>
      </Grid>
      <Dialog fullWidth open={open} onClose={closeHandler}>
        <NewMainLocationForm />
      </Dialog>

      <Grid item xs={6} md={6} backgroundColor="#0984e3">
        <Box fontSize={30} display="inline" margin="0px 0px 5px 5px">
          Shared Main Location
        </Box>
        {loadShare && <LinearProgress />}
        <Grid container spacing={1} padding="5px">
          {shareLibrary.map((lib) => (
            <Grid item xs={12} sm={12} md={6} key={lib.MainLocationID}>
              <ShareMainLocationOne mainData={lib} />
            </Grid>
          ))}
          {shareLibrary.length == 0 && !loadShare && (
            <Grid item xs={12} sm={12} md={6}>
              <h2>No Share Main Location.</h2>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLocationList;
