import { Box, TextField, Button, Dialog, Input } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useState, useEffect } from "react";
import { useApiURLContex } from "../../../../App";
import { useMainLocationContex } from "../../LocationPage";
import DeleteConfirm from "./DeleteConfirm";
import heic2any from "alexcorvi-heic2any";

const EditLocationForm = (props) => {
  const { ApiURL } = useApiURLContex();
  const { mainType, accessLvl } = useMainLocationContex();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [loadEdit, setLoadEdit] = useState(false);
  const [fileChange, setFileChange] = useState(false);

  const fetchEditLocation = async (event) => {
    setLoadEdit(true);
    event.preventDefault();
    console.log(props.locData);
    const data = new FormData(event.currentTarget);
    if (
      data.get("name") == props.locData.Name &&
      data.get("description") == props.locData.Description
    ) {
      if (props.locData.Photo === 0 && selectedFile == undefined) {
        props.closeEdit();
        return 0;
      }
      if (props.locData.Photo === 1 && !fileChange) {
        props.closeEdit();
        return 0;
      }
    }
    data.append("mainID", props.locData.MainLocationID);
    data.append("locType", mainType);
    data.append("locationID", props.locData.LocationID);
    if (data.get("description").length == 0) {
      data.delete("description");
    }
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
    const fetchURL = `${ApiURL}/location/updateLocation.php`;

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
      } else if (result === "UPDATED") {
        window.location.href = window.location.href;
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
    setSelectedFile(imgBlob);
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

  //+++++++++++++++++++++++++++++++++++++
  //USE EFFECT
  useEffect(() => {
    if (props.locData.Photo != 0) {
      const src = `${ApiURL}/image/readImageLocation.php?id1=${props.locData.MainLocationID}&id2=${props.locData.LocationID}`;
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
  //+++++++++++++++++++++++++++++++++++++
  //DIALOG Handler
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Box
      style={{ padding: "10px" }}
      component="form"
      onSubmit={fetchEditLocation}
    >
      <Box style={{ fontWeight: "bold", display: "inline" }}>Edit Location</Box>
      <Button
        onClick={openHandler}
        style={{ display: "inline", float: "right" }}
        variant="contained"
        color="error"
        disabled={accessLvl < 3}
      >
        Delete
      </Button>
      <TextField
        variant="filled"
        name="name"
        required
        fullWidth
        id="name"
        label="Location Name"
        defaultValue={props.locData.Name}
        autoFocus
      />

      <Box style={{ margin: "5px 0px 5px 0px" }}>
        {selectedFile && (
          <Box>
            <img
              alt="Loading Image..."
              style={{ maxHeight: "350px", maxWidth: "200px" }}
              src={preview}
            />
          </Box>
        )}
        <Button variant="outlined" for="uploadImage">
          Upload Image / Drag & Drop
          <Input
            id="uploadImage"
            sx={{ position: "absolute", opacity: "0" }}
            type="file"
            accept=".HEIC, .heic, .HEIF, .heif, image/*"
            onChange={onSelectFile}
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
        defaultValue={props.locData.Description}
        rows={4}
      />
      <Button
        variant="outlined"
        disabled={loadEdit}
        color="warning"
        onClick={props.closeEdit}
      >
        Cancel
      </Button>
      <Button
        variant="outlined"
        disabled={loadEdit}
        color="success"
        type="submit"
      >
        Update Location
      </Button>
      {loadEdit && <LinearProgress />}
      <Dialog open={open} onClose={closeHandler}>
        <DeleteConfirm close={closeHandler} data={props.locData} />
      </Dialog>
    </Box>
  );
};

export default EditLocationForm;
