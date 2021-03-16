import React, {useState} from 'react';
import '../../styling/layout.scss';
//import axios from 'axios';

const Background = (props) => {

    const [weatherDescription, setWeatherDescription] = useState();
    
    const drawWeather = ( d ) => {
        var description = d.weather[0].main;
        setWeatherDescription(description)
    }

    var key = 'f4af180985566b2060c127b014dce442';
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=141114,in&appid=' + key) 
        .then(function(resp) { return resp.json()})
        .then(res => drawWeather(res))
        .catch(err => console.log(err.message));

    // const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=141114,in&appid=f4af180985566b2060c127b014dce442';

    // useEffect(async () => {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         // console.log("Latitude is :", position.coords.latitude);
    //         // console.log("Longitude is :", position.coords.longitude);

    //         const result = axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' +position.coords.latitude+ '&lan=' +position.coords.longitude+ '&appid=f4af180985566b2060c127b014dce442')
    //         //setWeather(result.data);
    //         console.log(result.data);
    //         drawWeather(result.data);
    //     });
        
    // },[]);

   

    return (
        <div id = "Background" className={weatherDescription}>
            {props.children}
        </div>
    );
}

export default Background;



