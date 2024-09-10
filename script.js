async function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a valid city name.');
        return;
    }

    const apiKey = 'fd2efc81bdf24ebb8a7153138240807'; // Your WeatherAPI key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const loading = document.getElementById('loading');
    loading.classList.add('show-loading');

    try {
        console.log('Fetching weather data...'); // Debugging log
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Weather data received:', data); // Log received data

        if (data.error) {
            alert('City not found');
            loading.classList.remove('show-loading');
            return;
        }

        // Weather elements to update
        const weatherIcon = document.getElementById('weather-icon');
        const temperature = document.getElementById('temperature');
        const cityName = document.getElementById('city-name');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');

        // Update weather info
        weatherIcon.src = `https:${data.current.condition.icon}`;
        weatherIcon.style.opacity = "0"; // Fade effect
        setTimeout(() => weatherIcon.style.opacity = "1", 200); // Animate back

        temperature.innerText = `${data.current.temp_c}°C`;
        cityName.innerText = data.location.name;
        humidity.innerText = `Humidity: ${data.current.humidity}%`;
        windSpeed.innerText = `Wind Speed: ${data.current.wind_kph} km/h`;
    } catch (error) {
        console.error('Error fetching weather data:', error); // Debugging log
        alert('Error fetching weather data. Please try again.');
    } finally {
        loading.classList.remove('show-loading');
    }
}
