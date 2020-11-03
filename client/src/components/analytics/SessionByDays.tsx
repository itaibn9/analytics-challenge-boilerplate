import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Event } from "../../models"
import { httpClient } from "../../utils/asyncUtils";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getNumberOfDaysFromToday } from "./SessionByHour";
import { Props } from "../../containers/DashBoard"

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const SessionByDays: React.FC<Props> = () => {
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
      <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date To Search"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setInputDate(e.target.value)}
      />
    </form>
    <LineChart width={730} height={250} data={eventByDays}
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
