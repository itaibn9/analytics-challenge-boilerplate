import React,{ useEffect, useState } from "react";
import { Interpreter } from "xstate";
import { httpClient } from "../utils/asyncUtils";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import SessionByDays from "../components/analytics/SessionByDays";
import GoogleMapChart from "../components/analytics/GoogleMapChart";
import SessionByHour from "../components/analytics/SessionByHour";
import SearchBar from "../components/analytics/SearchBar";
export type Props = {
  [key: string]: any;
};


const DashBoard: React.FC = () => {


  return (
    <>
    <h1>Analytics</h1>
    <GoogleMapChart />
    <SessionByHour />
    <SessionByDays />
    <SearchBar />
    </>
  );
};

export default DashBoard;
