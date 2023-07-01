/* eslint-disable */

export const displayMap = (locations) => {
  // Create a Leaflet map instance with the id 'map' and disable the zoom control
  const map = L.map('map', { zoomControl: false });

  // Add a tile layer to the map using OpenStreetMap as the source
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Create a custom icon for the markers on the map
  const greenIcon = L.icon({
    iconUrl: '/img/pin.png',
    iconSize: [32, 40],
    iconAnchor: [16, 45],
    popupAnchor: [0, -50],
  });

  // Create an array to store the points (coordinates) of the locations
  const points = [];

  // Loop through each location in the 'locations' array
  locations.forEach((loc) => {
    // Add the coordinates of the location to the 'points' array
    points.push([loc.coordinates[1], loc.coordinates[0]]);

    // Create a marker at the location's coordinates with the greenIcon
    const marker = L.marker([loc.coordinates[1], loc.coordinates[0]], {
      icon: greenIcon,
    }).addTo(map);

    // Bind a popup to the marker with the location's details
    marker
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
        className: 'mapPopup',
      })
      .openPopup();
  });

  // Create bounds based on the points and adjust the padding
  const bounds = L.latLngBounds(points).pad(0.5);

  // Fit the map to the bounds
  map.fitBounds(bounds);

  // Disable scroll wheel zoom on the map
  map.scrollWheelZoom.disable();
};
