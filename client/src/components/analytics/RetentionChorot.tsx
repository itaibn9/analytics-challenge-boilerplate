import React, { useEffect, useState } from 'react'
import RetentionChart from "./RetentionChart";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
const RetentionChorot: React.FC = () => {
    const classes = useStyles();
    const [inputDate, setInputDate] = useState(1600511416326)
    
    const changeRetentionData = (date: string) => {
        setInputDate(new Date(date).getTime());
    }

    return (
        <div className="retention-cohort">
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
        onChange={(e) => changeRetentionData(e.target.value)}
      />
    </form>
            <RetentionChart dayZero={inputDate}/>
        </div>
    )
}

export default React.memo(RetentionChorot);
