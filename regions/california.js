const apiKey = '92e13e58-3c03-11f0-89da-0242ac130006-92e13ec6-3c03-11f0-89da-0242ac130006'; // Replace with your Stormglass API key

// Function to fetch and display surf data for each spot
function fetchSurfData(lat, lng, spotName) {
  const params = ['waveHeight', 'wavePeriod', 'windSpeed', 'windDirection'];
  const reportEl = document.getElementById(`${spotName}`);

  fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params.join(',')}&source=noaa`, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(res => res.json())
    .then(data => {
      const today = new Date().toISOString().split('T')[0];
      const noon = data.hours.find(hour => hour.time.includes(today + 'T12:00'));
      if (noon) {
        reportEl.innerHTML = `
          <strong>Wave Height:</strong> ${noon.waveHeight.noaa} m<br>
          <strong>Wave Period:</strong> ${noon.wavePeriod.noaa} s<br>
          <strong>Wind Speed:</strong> ${noon.windSpeed.noaa} m/s<br>
          <strong>Wind Direction:</strong> ${noon.windDirection.noaa}°
        `;
      } else {
        reportEl.innerText = 'No data available';
      }
    })
    .catch(() => {
      reportEl.innerText = 'Error loading surf data.';
    });
}

// Fetch data for each surf spot
fetchSurfData(36.9741, -122.0308, 'santa-cruz');  // Santa Cruz
fetchSurfData(36.9713, -122.0144, 'pleasure-point');  // Pleasure Point
fetchSurfData(36.9491, -122.0265, 'steamer-lane');  // Steamer Lane
