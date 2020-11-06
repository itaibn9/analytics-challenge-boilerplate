import React, { useEffect, useState } from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { httpClient } from "../../utils/asyncUtils";
import { Props } from "../../containers/DashBoard";
import { weeklyRetentionObject } from "../../models"
import { Table } from 'react-bootstrap';
import "./RetentionChart.css";

const RetentionChart: React.FC<Props> = ({dayZero}) => {
    const [retentionData, setRetentionData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRetentionData = async ():  Promise<weeklyRetentionObject[] | string | undefined> => {
        try {
            const { data } = await httpClient.get
            (`http://localhost:3001/events/retention?dayZero=${dayZero}`);
            setLoading(false);
            setRetentionData(data);
        } catch (error) {
            return error.message;
        }
    }

    useEffect(() => {
        fetchRetentionData();
    }, [dayZero])
    const options = {number:4}

    return (
        <div className="table-container" style={{width: '70%'}}>
          {loading ? (
                  <CircularProgress />

          ) : (
  <Table responsive="sm" striped hover>
    <thead>
      <tr>
        <th></th>
        {retentionData.map((week: weeklyRetentionObject) =>
         <th key={"week" + week.registrationWeek} >Week {week.registrationWeek}</th> )}
      </tr>
    </thead>
    <tbody>
      {retentionData.map((week: weeklyRetentionObject) =>{
      return (
          <tr key={"week" + week.registrationWeek + "retention"} className="retention-week">
        <td key={"week" + week.registrationWeek + "date"}>{week.start} <b>-</b> {week.end} <br></br>new users: {week.newUsers}</td>
        {week.weeklyRetention.map((retention : number) => <td key={"week" + week.registrationWeek + "data"}>{retention} %</td>)}
        </tr>
      )})}
    </tbody>
  </Table>
  )}
        </div>
    )
}

export default RetentionChart
