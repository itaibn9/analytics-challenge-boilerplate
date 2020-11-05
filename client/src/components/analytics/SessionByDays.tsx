import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Event } from "../../models"
import { httpClient } from "../../utils/asyncUtils";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getNumberOfDaysFromToday } from "./SessionByHour";
import { Props } from "../../containers/DashBoard";
import "./RetentionChart.css";



const SessionByDays: React.FC<Props> = ({chartSize}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      width: chartSize.width,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
  }));
    const classes = useStyles();
    const [eventByDays, setEventByDays]: any = useState([]);
    const [inputDate, setInputDate]: any = useState(new Date());

    const getEventsByDays = async (): Promise<Event[] | string | undefined> => {
        try {
          const offset = getNumberOfDaysFromToday(inputDate);
          const { data } = await httpClient.get(`http://localhost:3001/events/by-days/${offset}`);
          setEventByDays(data);
        } catch (error) {
          return error.message;
        }
      }
      
      useEffect(() => {
        getEventsByDays();
      }, [inputDate])
      
    return (
        <div className="byDayChart">
          <div className="byDay_header">
          <h3>Number of events per week by day</h3>
      <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setInputDate(e.target.value)}
      />
    </form>
    </div>
    <LineChart width={chartSize.width} height={chartSize.height} data={eventByDays}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
    </div>
    )
}

export default React.memo(SessionByDays)
