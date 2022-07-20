import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useLibraryContex } from "../../ObjectLibrary";
const FormAddObject = () => {
  const { libraryID, libType, accessLvl } = useLibraryContex();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  //FETCH ADD New Object
  const fetchAddObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", libraryID);
    data.append("libType", libType);
    if (data.get("description").length == 0) {
      data.delete("description");
    }
    if (selectedFile != undefined) {
      data.append("photo", 1);
      data.append("img1", selectedFile);
    }
    /* for (var pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    } */
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/object/addNewObject.php",
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

      console.log(result);
      if (result === "0") {
        window.location = window.location.origin + "/Login";
      } else if (result === "ADD") {
        window.location.reload();
      } else {
        console.log("Fail to Upload");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
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
              style={{ maxHeight: "200px", maxWidth: "200px" }}
              src={preview}
            />
          </Box>
        )}
        <Button component="label" variant="outlined">
          Upload Image
          <input type="file" accept="image/*" onChange={onSelectFile} hidden />
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
      <Button variant="contained" type="submit">
        Add New Object
      </Button>
    </Box>
  );
};

export default FormAddObject;