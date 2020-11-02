import React,{ useEffect, useState } from "react";
import { Interpreter } from "xstate";
import { httpClient } from "../utils/asyncUtils";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import SessionByDays from "../components/charts/SessionByDays";
import GoogleMapChart from "../components/charts/GoogleMapChart";
import SessionByHour from "../components/charts/SessionByHour";



const DashBoard: React.FC = () => {


  return (
    <>
    <h1>Analytics</h1>
    <GoogleMapChart />
    <SessionByHour />
    <SessionByDays />
    </>
  );
};

export default DashBoard;
