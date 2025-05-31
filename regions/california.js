const apiKey = 92e13e58-3c03-11f0-89da-0242ac130006-92e13ec6-3c03-11f0-89da-0242ac130006; // Replace with your Stormglass API key
const reportEl = document.getElementById('report');

const params = ['waveHeight', 'wavePeriod', 'windSpeed', 'windDirection'];
const lat = 33.6595;
const lng = -117.9988; // Huntington Beach

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

