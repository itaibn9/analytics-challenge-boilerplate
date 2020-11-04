import React, { useEffect, useState } from 'react'
import { httpClient } from "../../utils/asyncUtils";
import { Event, weeklyRetentionObject } from "../../models"
import RetentionChart from "./RetentionChart";

// http://localhost:3001/events/retention?dayZero=1600511416326
// {
//     "registrationWeek": 6,
//     "newUsers": 0,
//     "weeklyRetention": [
//         100
//     ],
//     "start": "31-10-2020",
//     "end": "07-11-2020"
// }
const RetentionChorot: React.FC = () => {
    const [retentionData, setRetentionData] = useState([]);

    const fetchRetentionData = async ():  Promise<weeklyRetentionObject[] | string | undefined> => {
        try {
            const { data } = await httpClient.get
            (`http://localhost:3001/events/retention?dayZero=1601511416326`);
            console.log(data);
            setRetentionData(data);
        } catch (error) {
            return error.message;
        }
    }

    useEffect(() => {
        fetchRetentionData()
    }, [])
    return (
        <div>
          {retentionData.map((week: weeklyRetentionObject)  => 
            <RetentionChart key={week.start} weekData={week}/>
            )}
        </div>
    )
}

export default React.memo(RetentionChorot);
