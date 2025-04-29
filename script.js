async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = '557fe8ff311569c832d33ebb698e914b';
    const loading = document.getElementById("loading");
    const result = document.getElementById("weatherResult");
    const error = document.getElementById("errorMessage");
  
    result.innerHTML = '';
    error.style.display = 'none';
    loading.style.display = 'block';
  
    if (city === '') {
      showError("Please enter a city name.");
      loading.style.display = 'none';
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
  
      const weatherHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
      `;
      result.innerHTML = weatherHTML;
    } catch (err) {
      showError(err.message);
    } finally {
      loading.style.display = 'none';
    }
  }
  
  function showError(message) {
    const error = document.getElementById("errorMessage");
    error.innerText = message;
    error.style.display = 'block';
  }
  