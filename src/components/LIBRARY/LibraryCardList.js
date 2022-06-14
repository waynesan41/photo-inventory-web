import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Dialog, Grid, Item } from "@mui/material";
import LibraryCardOwn from "./-OWN/LibraryCardOwn";
import LibraryCardShare from "./-SHARE/LibraryCardShare";
import NewLibraryForm from "./-NEWLIBRARY/NewLibraryForm";
import { Link, NavLink } from "react-router-dom";

const ChangePeopleContex = React.createContext();
export const useChangePeople = () => {
  return useContext(ChangePeopleContex);
};

const LibraryCardList = () => {
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
      if (lib.LibraryID == id) {
        if (ps == 1) lib.NumPeople++;
        else if (ps == 2) lib.NumPeople--;
      }
      return lib;
    });
    setOwnLibrary([...items]);
  };

  const fetchLibrary = async (libType) => {
    const formData = new FormData();
    formData.append("library", libType);

    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/Library/getLibrary.php",
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

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else {
        if (libType == 1) {
          setOwnLibrary([...result]);
        } else if (libType == 2) {
          setShareLibrary([...result]);
        }
      }
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
        <h2 style={{ display: "inline-block" }}>Own Library</h2>
        <Button variant="contained" onClick={openHandler}>
          Add New Library
        </Button>
        <ChangePeopleContex.Provider value={changeTotalPeople}>
          <Grid container spacing={1}>
            {ownLibrary.map((lib) => (
              <Grid item xs={12} sm={12} md={6} key={lib.LibraryID}>
                <LibraryCardOwn libraryData={lib} />
              </Grid>
            ))}
          </Grid>
        </ChangePeopleContex.Provider>
      </Grid>
      <Dialog open={open} onClose={closeHandler}>
        <NewLibraryForm />
      </Dialog>

      <Grid item xs={6} md={6}>
        <h2>Share Library</h2>
        <Grid container spacing={1}>
          {shareLibrary.map((lib) => (
            <Grid item xs={12} sm={12} md={6} key={lib.ObjectLibraryID}>
              <LibraryCardShare libraryData={lib} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LibraryCardList;
