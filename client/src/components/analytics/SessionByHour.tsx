import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Event } from "../../models"
import { httpClient } from "../../utils/asyncUtils";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Props } from "../../containers/DashBoard"
import "./RetentionChart.css";




export const getNumberOfDaysFromToday = (date: any = new Date()): number => {
 const today = new Date();
 const dateToCalculate = new Date(date);
 let Difference_In_Time = today.getTime() - dateToCalculate.getTime();
 let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
 return Difference_In_Days;
}

const SessionByHour: React.FC<Props> = ({chartSize}) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      width: chartSize.width,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
const classes = useStyles();
const [eventByHour, setEventByHour]: any = useState([]);
const [inputDate, setInputDate]: any = useState(new Date());
const [loading, setLoading] = useState(true);


const getEventsByHour = async (): Promise<Event[] | string | undefined> => {
  try {
    const offset = getNumberOfDaysFromToday(inputDate);
    const { data } = await httpClient.get(`http://localhost:3001/events/by-hours/${offset}`);
    setLoading(false);
    setEventByHour(data);
  } catch (error) {
    return error.message;
  }
}

useEffect(() => {
getEventsByHour();
}, [inputDate])

    return (
      <div className="lineChart">
        <div className="byHour_header">
        <h3>Number of events per day by hour</h3>
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
    {loading ? (
      <CircularProgress />
    ) : (
    <LineChart width={chartSize.width} height={chartSize.height} data={eventByHour}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="hour" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
    )}
    </div>
    )
}

export default React.memo(SessionByHour);
