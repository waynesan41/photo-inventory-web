import { Box, TextField, Button, Dialog } from "@mui/material";

import { useState, useEffect } from "react";
import { useLibraryContex } from "../ObjectLibrary";
import DeleteConfirm from "./DeleteConfirm";

const EditForm = (props) => {
  const { libraryID, libType } = useLibraryContex();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  //FETCH UPDATE OBJECT
  const fetchUpdateObject = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("libraryID", libraryID);
    data.append("libType", libType);
    data.append("objectID", props.objData.ObjectID);
    /* if (data.get("description").length == 0) {
      data.delete("description");
    } */
    if (selectedFile != undefined) {
      data.append("photo", 1);
      data.append("img1", selectedFile);
    }

    for (var pair of data.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const response = await fetch(
        "http://localhost/PhotoInventory/Backend/api/object/updateObject.php",
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
      } else if (result === "UPDATED") {
        window.location.reload();
      } else {
        console.log("Fail to UPDATE");
        console.log(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchOrignalImage = async (url) => {
    const res = await fetch(url, {
      method: "GET",
    });
    const imgBlob = await res.blob();
    setSelectedFile(imgBlob);
  };
  const removePreview = () => {
    setPreview(null);
    setSelectedFile(undefined);
  };
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (props.objData.Photo != 0) {
      const src = `http://localhost/PhotoInventory/Backend/api/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`;
      fetchOrignalImage(src);
      setPreview(src);
    }
  }, []);
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

  return (
    <Box
      style={{ padding: "10px" }}
      component="form"
      onSubmit={fetchUpdateObject}
    >
      <Box style={{ fontWeight: "bold", display: "inline" }}>Edit Object</Box>
      <Button
        onClick={openHandler}
        style={{ display: "inline", float: "right" }}
        variant="contained"
        color="error"
      >
        Delete
      </Button>
      <TextField
        variant="filled"
        name="name"
        required
        fullWidth
        id="name"
        label="Object Name"
        defaultValue={props.objData.Name}
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
        defaultValue={props.objData.Description}
        rows={4}
      />
      <Button variant="outlined" color="warning" onClick={props.closeEdit}>
        Cancel
      </Button>
      <Button variant="outlined" color="success" type="submit">
        Update Object
      </Button>
      <Dialog open={open} onClose={closeHandler}>
        <DeleteConfirm
          libraryID={libraryID}
          libType={libType}
          close={closeHandler}
          objectID={props.objData.ObjectID}
        />
      </Dialog>
    </Box>
  );
};

export default EditForm;
