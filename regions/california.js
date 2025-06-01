
// Define the surf spots and their coordinates
const spots = [
  { name: "Capitola", lat: 36.9741, lon: -121.9530, id: "capitola" },
  { name: "Pleasure Point", lat: 36.9516, lon: -121.9656, id: "pleasure-point" },
  { name: "Davenport", lat: 37.0114, lon: -122.1975, id: "davenport" },
  { name: "Scotts Creek", lat: 37.0701, lon: -122.2733, id: "scotts-creek" },
  { name: "Waddell Creek", lat: 37.1016, lon: -122.2846, id: "waddell-creek" }
];

// Open-Meteo Marine API URL
const apiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude={lat}&longitude={lon}&hourly=wave_height,wind_speed,weather`;

// Function to fetch surf data from the API
async function fetchSurfData() {
  const dataPromises = spots.map(spot => 
    fetch(apiUrl.replace("{lat}", spot.lat).replace("{lon}", spot.lon))
      .then(response => response.json())
      .then(data => {
        // Display the forecast data on the website
        document.getElementById(spot.id).innerHTML = `
          <strong>${spot.name}</strong><br>
          Wave Height: ${data.hourly.wave_height[0]}m<br>
          Wind Speed: ${data.hourly.wind_speed[0]}m/s<br>
          Weather: ${data.hourly.weather[0].description}
        `;
      })
      .catch(error => {
        console.error("Error fetching data for " + spot.name, error);
        // Handle errors
        document.getElementById(spot.id).innerHTML = `Error loading ${spot.name}'s forecast.`;
      })
  );
  
  // Wait for all data to be fetched
  await Promise.all(dataPromises);
}

// Call the function to fetch the data when the page loads
fetchSurfData();
