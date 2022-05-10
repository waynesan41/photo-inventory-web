import React from "react";
import { Grid, Card } from "@mui/material";
import BlockedUserList from "../components/connection/BlockedUserList";
import ConnectedUser from "../components/connection/ConnectedUser";
import RequestTo from "../components/connection/RequestTo";
import RequestFrom from "../components/connection/RequestFrom";
import SearchUser from "../components/connection/SearchUser";

const Connection = () => {
  return (
    <Grid container>
      <Grid item md={2.4} xs={12}>
        <Card>Search</Card>
        <SearchUser />
      </Grid>
      <Grid item md={2.4} xs={12}>
        <Card>Connection</Card>
        <ConnectedUser />
      </Grid>
      <Grid item md={2.4} xs={12}>
        <Card>Request From</Card>
        <RequestFrom />
      </Grid>
      <Grid item md={2.4} xs={12}>
        <Card>Request To</Card>
        <RequestTo />
      </Grid>
      <Grid item md={2.4} xs={12}>
        <Card>Block</Card>
        <BlockedUserList />
      </Grid>
    </Grid>
  );
};

export default Connection;
