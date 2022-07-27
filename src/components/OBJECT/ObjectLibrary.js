import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OwnHeader from "./-HEADER/OwnHeader";
import ShareHeader from "./-HEADER/ShareHeader";

import ObjectList from "./-COMPONENTS/ObjectList";
import { useApiURLContex } from "../../App";

const LibraryContex = React.createContext();
export const useLibraryContex = () => {
  return useContext(LibraryContex);
};

const ObjectLibrary = () => {
  const { ApiURL } = useApiURLContex();
  let { libraryID } = useParams();
  const [libType, setLibType] = useState();
  const [accessLvl, setAccessLvl] = useState();

  const fetchCheckLibrary = async () => {
    const data = new FormData();

    data.append("libraryID", libraryID);
    const fetchURL = `${ApiURL}/object/checkAccess.php`;

    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = await response.text();

      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result == 5) {
        setLibType(0);
      } else if (result == 4) {
        setLibType(1);
      } else if (result > 0 && result < 4) {
        setLibType(2);
        setAccessLvl(result);
      } else {
        console.log("fail to fetch");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCheckLibrary();
  }, []);

  return (
    <>
      <LibraryContex.Provider value={{ libraryID, libType, accessLvl }}>
        {libType == 0 && <h3>Sorry You don't have Access to the Library</h3>}
        {libType == 1 && <OwnHeader libraryID={libraryID} />}
        {libType == 2 && <ShareHeader />}
        {(libType == 1 || libType == 2) && <ObjectList />}
      </LibraryContex.Provider>
    </>
  );
};

export default ObjectLibrary;
