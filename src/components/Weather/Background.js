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
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=141114,in&appid=4a5dad8103a34efa4c17c71a17085e69`)
        .then(resp => resp.json())
        .then(res => drawWeather(res))
       // .then(res => drawWeather(res))
        .catch(err => console.log(err.message));
    },[])

    return (
        <div id = "Background" className={weatherDescription}>
            {props.children}
        </div>
    );
}

export default Background;



