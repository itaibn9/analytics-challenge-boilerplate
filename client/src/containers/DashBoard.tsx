import React,{ useEffect, useState } from "react";
import SessionByDays from "../components/analytics/SessionByDays";
import GoogleMapChart from "../components/analytics/GoogleMapChart";
import SessionByHour from "../components/analytics/SessionByHour";
import SearchBar from "../components/analytics/SearchBar";
import RetentionChorot from "../components/analytics/RetentionChorot";
import ErrorBoundary from "./ErrorBoundary";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export type Props = {
  [key: string]: any;
};
const useStyles = makeStyles((theme) => ({
  dashboard: {
    flexGrow: 1,
    gap: "20px",
    marginTop: "20px",
    maxWidth: "95vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    boxShadow: "0.5px 0px 0.5px 2px black",
    height: "43vh",
    minWidth: "300px",
    minHeight: "250px",
    padding: "0px",
    alignContent: "center",
  },
  GeoTile: {
    display: "flex",
    boxShadow: "0.5px 0px 0.5px 2px black",
    height: "70vh",
    minWidth: "90vw",
    minHeight: "250px",
    padding: "0px",
  },
  "MuiGrid-item": {
    padding: "10px",
  },
}));


const DashBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <>
    <h1>Analytics</h1>
    <ErrorBoundary>
        <Grid container justify={"center"} spacing={10} className={classes.dashboard}>
          <ErrorBoundary>
            <Grid item className={classes.GeoTile} xs={10}>
            <GoogleMapChart />
            </Grid>
          </ErrorBoundary>
          <ErrorBoundary>
            <Grid item className={classes.tile} xs={5}>
            <SessionByDays />
            </Grid>
          </ErrorBoundary>
          <ErrorBoundary>
            <Grid item className={classes.tile} xs={6}>
            <SessionByHour />
            </Grid>
          </ErrorBoundary>
          <ErrorBoundary>
            <Grid item className={classes.GeoTile} xs={7}>
            <RetentionChorot />
            </Grid>
          </ErrorBoundary>
          <ErrorBoundary>
            <Grid item className={classes.tile} xs={7}>
            <SearchBar/>
            </Grid>
          </ErrorBoundary>
          </Grid>
      </ErrorBoundary>
    </>
  );
};

export default DashBoard;
