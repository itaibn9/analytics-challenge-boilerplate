import React, { useEffect, useState } from 'react';
import { Props } from "../../containers/DashBoard";
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from "moment";
import { httpClient } from "../../utils/asyncUtils";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '30vw',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);

const SearchResultTicket: React.FC<Props> = ({ userId, eventName, url, date, os, browser}) => {
    const classes = useStyles();
    const [userFullName, setUserFullName] = useState("");
    const getUsersInfo = async () => {
        const { data : userData } = await httpClient.get(`http://localhost:3001/events/find-user/${userId}`);
        setUserFullName (userData.user.firstName + " " + userData.user.lastName);
    }
    useEffect(() => {getUsersInfo()}, [])
    return (
        <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>User {userId} {userFullName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              <b>Event name:</b> {eventName}<br></br>
               <b>url:</b> {url}<br></br>
              <b>date:</b> {moment.unix(date/1000).format("DD-MM-YYYY hh:mm:ss")}<br></br>
               <b>os:</b> {os}<br></br>
                <b>browser:</b> {browser}<br></br>
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>
    )
}

export default SearchResultTicket
