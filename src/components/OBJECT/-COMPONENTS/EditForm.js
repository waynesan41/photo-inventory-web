import { useState, useEffect } from "react";

import { useApiURLContex } from "../../../App";
import { useLibraryContex } from "../ObjectLibrary";
import DeleteConfirm from "./DeleteConfirm";

import { Box, TextField, Button, Dialog } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const EditForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const { libraryID, libType } = useLibraryContex();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [loadEdit, setLoadEdit] = useState(false);
  const [fileChange, setFileChange] = useState(false);

  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  //FETCH UPDATE OBJECT
  const fetchUpdateObject = async (event) => {
    setLoadEdit(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //This IF Check if the Values Changed.
    if (
      data.get("name") == props.objData.Name &&
      data.get("description") == props.objData.Description
    ) {
      if (props.objData.Photo === 0 && selectedFile == undefined) {
        props.closeEdit();
        return 0;
      }
      if (props.objData.Photo === 1 && !fileChange) {
        props.closeEdit();
        return 0;
      }
    }
    data.append("libraryID", libraryID);
    data.append("libType", libType);
    data.append("objectID", props.objData.ObjectID);
    /* if (data.get("description").length == 0) {
        data.delete("description");
      } */
    if (selectedFile != undefined) {
      if (fileChange) {
        data.append("photo", 1);
        data.append("img1", selectedFile);
      } else {
        // console.log("Photo DON'T Change!");
      }
      // console.log(selectedFile);
    } else {
      data.append("photo", 0);
    }

    /* for (var pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      } */
    const fetchURL = `${ApiURL}/object/updateObject.php`;

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

      if (result === 0) {
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
    setLoadEdit(false);
  };
  const fetchOrignalImage = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const imgBlob = await res.blob();
    const imgFile = new File([imgBlob], "imgName");
    setSelectedFile(imgFile);
  };
  const removePreview = () => {
    setFileChange(true);
    setPreview(null);
    setSelectedFile(undefined);
  };
  const onSelectFile = (e) => {
    setFileChange(true);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  //+++++++++++++++++++++++++++++++++++++
  //USE EFFECT
  useEffect(() => {
    if (props.objData.Photo != 0) {
      const src = `${ApiURL}/image/readImageObject.php?id1=${props.objData.LibraryID}&id2=${props.objData.ObjectID}`;
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
      <Button
        variant="outlined"
        color="warning"
        disabled={loadEdit}
        onClick={props.closeEdit}
      >
        Cancel
      </Button>
      <Button
        variant="outlined"
        color="success"
        disabled={loadEdit}
        type="submit"
      >
        Update Object
      </Button>
      {loadEdit && <LinearProgress />}
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
