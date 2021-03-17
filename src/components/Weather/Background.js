import React, {useState, useEffect} from 'react';
import '../../styling/layout.scss';
//import axios from 'axios';

const Background = (props) => {

    const [weatherDescription, setWeatherDescription] = useState();
    
    const drawWeather = ( data) => {
        var description = data.weather[0].main;
        setWeatherDescription(description)
    }

    useEffect(()=> {
        fetch('https://api.openweathermap.org/data/2.5/weather?zip=141114,in&appid=f4af180985566b2060c127b014dce442') 
        .then(resp => resp.json())
        .then(res => drawWeather(res))
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
    },[])

    return (
        <div id = "Background" className={weatherDescription}>
            {props.children}
        </div>
    );
}

export default Background;



