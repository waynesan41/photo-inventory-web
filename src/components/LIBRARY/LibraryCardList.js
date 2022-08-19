import React, { useContext, useEffect, useState } from "react";

import { Button, Dialog, Box, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import LibraryCardOwn from "./-OWN/LibraryCardOwn";
import LibraryCardShare from "./-SHARE/LibraryCardShare";
import NewLibraryForm from "./-NEWLIBRARY/NewLibraryForm";
import { useApiURLContex } from "../../App";

const ChangePeopleContex = React.createContext();
export const useChangePeople = () => {
  return useContext(ChangePeopleContex);
};

const LibraryCardList = () => {
  const { ApiURL } = useApiURLContex();
  const [ownLibrary, setOwnLibrary] = useState([]);
  const [shareLibrary, setShareLibrary] = useState([]);

  const [open, setOpen] = useState(false);

  const [loadOwn, setLoadOwn] = useState(false);
  const [loadShare, setLoadShare] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };

  const changeTotalPeople = (id, ps) => {
    const items = ownLibrary.filter((lib) => {
      if (lib.LibraryID === id) {
        if (ps === 1) lib.NumPeople++;
        else if (ps === 2) lib.NumPeople--;
      }
      return lib;
    });
    setOwnLibrary([...items]);
  };

  const fetchLibrary = async (libType) => {
    if (libType == 1) {
      setLoadOwn(true);
    } else {
      setLoadShare(true);
    }
    const formData = new FormData();
    formData.append("library", libType);
    const fetchURL = `${ApiURL}/library/getLibrary.php`;

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
      console.log(result);
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else {
        if (libType === 1) {
          if (result === "NO LIBRARY") setOwnLibrary([]);
          else setOwnLibrary([...result]);
        } else if (libType === 2) {
          if (result === "NO LIBRARY") setShareLibrary([]);
          else setShareLibrary([...result]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    if (libType == 1) {
      setLoadOwn(false);
    } else {
      setLoadShare(false);
    }
  };

  useEffect(() => {
    fetchLibrary(1);
    fetchLibrary(2);
  }, []);

  return (
    <Grid container spacing={2} style={{ padding: "5px" }}>
      <Grid item xs={6} md={6}>
        <Box fontSize={30} display="inline-block" marginBottom={2}>
          Own Library
        </Box>
        <Button
          variant="contained"
          onClick={openHandler}
          style={{ display: "inline", float: "right" }}
        >
          Add New Library
        </Button>
        {loadOwn && <LinearProgress />}
        <ChangePeopleContex.Provider value={changeTotalPeople}>
          <Grid container spacing={1}>
            {ownLibrary.map((lib) => (
              <Grid item xs={12} sm={12} md={6} key={lib.LibraryID}>
                <LibraryCardOwn libraryData={lib} />
              </Grid>
            ))}
            {ownLibrary.length == 0 && !loadOwn && (
              <Grid item xs={12} sm={12} md={6}>
                <h2>No Own Library</h2>
              </Grid>
            )}
          </Grid>
        </ChangePeopleContex.Provider>
      </Grid>
      <Dialog open={open} onClose={closeHandler}>
        <NewLibraryForm />
      </Dialog>

      <Grid item xs={6} md={6}>
        <Box fontSize={30} display="inline-block" marginBottom={2}>
          Shared Library
        </Box>
        {loadShare && <LinearProgress />}
        <Grid container spacing={1}>
          {shareLibrary.map((lib) => (
            <Grid item xs={12} sm={12} md={6} key={lib.ObjectLibraryID}>
              <LibraryCardShare libraryData={lib} />
            </Grid>
          ))}
          {shareLibrary.length == 0 && !loadShare && (
            <Grid item xs={12} sm={12} md={6}>
              <h2>No Share Library</h2>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LibraryCardList;
