import React, { useContext, useEffect, useState } from "react";
import { Button, Dialog, Grid } from "@mui/material";

import { Link, NavLink } from "react-router-dom";

import NewMainLocationForm from "./-NEWMAIN/NewMainLocationForm";
import OwnMainLocationOne from "./-OWN/OwnMainLocationOne";
import ShareMainLocationOne from "./-SHARE/ShareMainLocationOne";

const ChangePeopleContex = React.createContext();
export const useChangePeople = () => {
  return useContext(ChangePeopleContex);
};

const MainLocationList = () => {
  const [ownLibrary, setOwnLibrary] = useState([]);
  const [shareLibrary, setShareLibrary] = useState([]);

  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(null);

  const openHandler = (type) => {
    setFormType(type);
    setOpen(true);
  };
  const closeHandler = () => {
    setFormType(null);
    setOpen(false);
  };

  const changeTotalPeople = (id, ps) => {
    const items = ownLibrary.filter((lib) => {
      if (lib.MainLocationID == id) {
        if (ps == 1) lib.NumPeople++;
        else if (ps == 2) lib.NumPeople--;
      }
      return lib;
    });
    setOwnLibrary([...items]);
  };

  const fetchLibrary = async (libType) => {
    const formData = new FormData();
    formData.append("mainLocation", libType);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/mainLocation/getMainLocation.php",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.json();

      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else {
        if (libType == 1) {
          if (result == "NO LOCATION") setOwnLibrary([]);
          else setOwnLibrary([...result]);
        } else if (libType == 2) {
          if (result == "NO SHARE LOCATION") setShareLibrary([]);
          else setShareLibrary([...result]);
        }
      }
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchLibrary(1);
    fetchLibrary(2);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={6}>
        <h2 style={{ display: "inline-block" }}>Own Main Location</h2>
        <Button variant="contained" onClick={openHandler}>
          Add New Main Location
        </Button>
        <ChangePeopleContex.Provider value={changeTotalPeople}>
          <Grid container spacing={1}>
            {ownLibrary.map((lib) => (
              <Grid item xs={12} sm={12} md={6} key={lib.MainLocationID}>
                <OwnMainLocationOne mainData={lib} />
              </Grid>
            ))}
          </Grid>
        </ChangePeopleContex.Provider>
      </Grid>
      <Dialog open={open} onClose={closeHandler}>
        <NewMainLocationForm />
      </Dialog>

      <Grid item xs={6} md={6}>
        <h2>Share Main Location</h2>
        <Grid container spacing={1}>
          {shareLibrary.map((lib) => (
            <Grid item xs={12} sm={12} md={6} key={lib.MainLocationID}>
              <ShareMainLocationOne mainData={lib} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLocationList;
