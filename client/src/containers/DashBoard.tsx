import React,{ useEffect, useState } from "react";
import SessionByDays from "../components/analytics/SessionByDays";
import GoogleMapChart from "../components/analytics/GoogleMapChart";
import SessionByHour from "../components/analytics/SessionByHour";
import SearchBar from "../components/analytics/SearchBar";
import RetentionChorot from "../components/analytics/RetentionChorot";
import ErrorBoundary from "./ErrorBoundary";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from '@material-ui/core';
import "../components/analytics/RetentionChart.css";

export type Props = {
  [key: string]: any;
};
const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    display: "grid",
    gridGap: "40px",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "10px",
    height: "inherit",
    width: "inherit",
    gridTemplate: `
    'header header' 
    'Map byDayChart'  
    'retentionChart retentionChart' 
    'searchChart byHourChart' `  
  },
  main: {
    marginTop: "4rem",
    display: "grid",
    padding: "10px",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "center",
    gridTemplateColumns: "auto",
    width: "100%",
  },
  paper: {
    minHeight: "90vh",
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  }
}));
const mapSize = {
  width: '800px',
  height: '300px',
  marginLeft: '50px'
};
const chartSize = {
  width: 400,
  height: 250
}

const DashBoard: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper id="wrapper">
      <Typography style={{marginLeft: "20px", marginTop: "20px"}} component="h2" variant="h6" color="primary" gutterBottom>
      Analytics
    </Typography>
       <Grid container direction="column" justify="space-between" alignItems="center">
      <div className={classes.grid}>
      <Grid item>
    </Grid>
    <ErrorBoundary>
        <div>
          <ErrorBoundary>
          <Grid item style={{marginTop:"100px", marginRight:"250px"}}>
         <GoogleMapChart mapSize={mapSize}/>
        </Grid>
          </ErrorBoundary>
          <Grid item>
          <Grid container direction="row" justify="flex-start" >
          <Grid item>
          <ErrorBoundary>
          <SessionByDays chartSize={chartSize}/>
          </ErrorBoundary>
          </Grid>
          <Grid item>
          <ErrorBoundary>
            <SessionByHour chartSize={chartSize}/>
        </ErrorBoundary>
        </Grid>
        </Grid>
            </Grid>
        <ErrorBoundary>
            <Grid item>
          <RetentionChorot />
          </Grid>
          </ErrorBoundary>
          <ErrorBoundary>
          <Grid item >
          <SearchBar/>
        </Grid>
        </ErrorBoundary>
          </div>
      </ErrorBoundary>
    </div>
    </Grid>
    </Paper>
  );
};

export default DashBoard;
