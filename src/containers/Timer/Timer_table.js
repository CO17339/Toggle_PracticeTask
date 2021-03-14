import React, {useState, useEffect} from 'react';
import axios from '../../axios-data';
import '../../styling/table.scss';

const Timer_table = () => {

    const [displayData, updateDisplayData] = useState([]);

    useEffect(async () => {
        const content = await axios(
        'https://togglttrack-default-rtdb.firebaseio.com/projects.json',
        );
        updateDisplayData(content.data);
    },[]);


    const list = []
    for(var i in displayData){
        list.push(displayData[i]);
    }

    const info = list.map(display => {
        return (
            <tr>
                <td>{display.project}</td>
                <td>{display.client}</td>
                <td>{display.date_started}</td>
                <td>{display.time_spent}</td>
            </tr>
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Projects</th>
                        <th>Clients</th>
                        <th>Date Started</th> 
                        <th>Time Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {info}
                </tbody>
            </table>
        </div>
    );
}

export default Timer_table;