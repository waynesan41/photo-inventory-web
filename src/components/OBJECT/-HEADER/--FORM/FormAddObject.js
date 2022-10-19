import { useState, useEffect } from "react";
import { useApiURLContex } from "../../../../App";
import { useLibraryContex } from "../../ObjectLibrary";

import { Box, Button, TextField } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import heic2any from "alexcorvi-heic2any";

const FormAddObject = () => {
  const { ApiURL } = useApiURLContex();
  const { libraryID, libType } = useLibraryContex();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [loadAdd, setLoadAdd] = useState(false);

  //FETCH ADD New Object
  const fetchAddObject = async (event) => {
    setLoadAdd(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", libraryID);
    data.append("libType", libType);
    if (data.get("description").length === 0) {
      data.delete("description");
    }
    if (selectedFile != undefined) {
      data.append("photo", 1);
      data.append("img1", selectedFile);
    }
    for (var pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const fetchURL = `${ApiURL}/object/addNewObject.php`;

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

      console.log(result);
      if (result === 0) {
        window.location = window.location.origin + "/Login";
      } else if (result === "ADD") {
        window.location.href = window.location.href;
      } else {
        console.log("Fail to Upload");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoadAdd(false);
  };

  const removePreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };
  // PREVIEW UPLOAD IMAGE
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    } else if (e.target.files) {
      console.log(e.target.files[0].type);
      const type = e.target.files[0].type;
      if (type === "image/heif" || type === "image/heic") {
        console.log("THis is Iphone Photos");
        heic2any({
          blob: e.target.files[0],
          toType: "image/jpeg",
          quality: 0.5,
        }).then((convertedBlob) => {
          setSelectedFile(convertedBlob);
          console.log(convertedBlob);
          let url = URL.createObjectURL(convertedBlob);
        });
      }
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <Box
      minWidth={500}
      style={{ padding: "5px" }}
      component="form"
      onSubmit={fetchAddObject}
    >
      <h3>Add New Object</h3>
      <TextField
        variant="filled"
        name="name"
        required
        fullWidth
        id="name"
        label="Object Name"
        autoFocus
      />

      <Box style={{ margin: "5px 0px 5px 0px" }}>
        {selectedFile && (
          <Box>
            <img
              alt="Loading Image..."
              style={{ maxHeight: "200px", maxWidth: "200px" }}
              src={preview}
            />
          </Box>
        )}
        <Button component="label" variant="outlined">
          Upload Image
          <input
            type="file"
            accept=".HEIC, .heic, .HEIF, .heif, image/*"
            onChange={onSelectFile}
            hidden
          />
        </Button>
        <Button variant="outlined" color="error" onClick={removePreview}>
          Remove Image
        </Button>
      </Box>

      <TextField
        style={{ margin: "5px 0px 5px 0px" }}
        multiline
        variant="outlined"
        name="description"
        fullWidth
        id="description"
        label="Description"
        rows={4}
      />
      <Button variant="contained" disabled={loadAdd} type="submit">
        Add New Object
      </Button>
      {loadAdd && <LinearProgress />}
    </Box>
  );
};

export default FormAddObject;
