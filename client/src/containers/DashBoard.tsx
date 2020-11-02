import React,{ useEffect, useState } from "react";
import { Interpreter } from "xstate";
import { httpClient } from "../utils/asyncUtils";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";

import GoogleMapChart from "../components/charts/GoogleMapChart";
import ChartLine from "../components/charts/ChartLine";



const DashBoard: React.FC = () => {


  return (
    <>
    <h1>Analytics</h1>
    <GoogleMapChart />
    <ChartLine />
    </>
  );
};

export default DashBoard;
