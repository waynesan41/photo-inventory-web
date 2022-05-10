import React from "react";
import { Typography, Link } from "@mui/material";
function CopyRight(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://717logistics.com/">
        717 Logistics
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyRight;
