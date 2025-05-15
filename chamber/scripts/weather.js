// scripts/weather.js - Virginia-specific weather data
async function fetchVirginiaWeather() {
    // Coordinates for McLean, VA (adjust for your specific city)
    const latitude = "38.9339";
    const longitude = "-77.1773";
    
    try {
        // 1. Get weather station ID for McLean, VA
        const stationResponse = await fetch(
            `https://api.weather.gov/points/${latitude},${longitude}`
        );
        const stationData = await stationResponse.json();
        
        // 2. Get forecast for this station
        const forecastResponse = await fetch(stationData.properties.forecast);
        const forecastData = await forecastResponse.json();
        
        displayVirginiaWeather(forecastData);
    } catch (error) {
        console.error("Error fetching Virginia weather:", error);
        document.getElementById("weather-data").innerHTML = 
            `<p>Virginia weather data temporarily unavailable</p>`;
    }
}

function displayVirginiaWeather(data) {
    const current = data.properties.periods[0];
    
    // Current conditions
    document.getElementById("weather-data").innerHTML = `
        <img src="${current.icon}" alt="${current.shortForecast}">
        <p>${current.temperature}°F</p>
        <p>${current.shortForecast}</p>
        <p>Wind: ${current.windSpeed} ${current.windDirection}</p>
    `;
    
    // 3-day forecast (Virginia-specific)
    const forecastDiv = document.getElementById("forecast-data");
    forecastDiv.innerHTML = "";
    
    for (let i = 1; i <= 3; i++) {
        const day = data.properties.periods[i*2]; // Get daytime forecasts
        forecastDiv.innerHTML += `
            <div class="forecast-day">
                <p>${day.name}</p>
                <img src="${day.icon}" alt="${day.shortForecast}">
                <p>${day.temperature}°F</p>
                <p>${day.shortForecast}</p>
            </div>
        `;
    }
}

// Initialize
fetchVirginiaWeather();