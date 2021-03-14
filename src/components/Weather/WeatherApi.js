import React, {useState} from 'react';

function getWeather() {
    const [weather, setWeather] = useState();

    const apiURL = 'http://api.weatherstack.com/current?access_key=1a60f24c2cb05aa84918950c48b2d598&query=New%20York';

    const fetchData = async () => {
        const response = await axios.get(apiURL)

        setWeather(response.data);
        console.log(weather);
    }
    return (data.weather_descriptions);
}

