$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});

//MAP
const initMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidXp2b3lhZ2UiLCJhIjoiY2p0c3NsOTNuMTRieDQ0bnNnZmdwcGdqZSJ9.tX1tzc3xzvjwu4e00_l66w";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    center: [-75.610474, 45.433556],
    zoom: 12.5
  });
  const popup = new mapboxgl.Popup()
    .setHTML(`<h2>Groceteria Store</h2><p>1980 Ogilvie Rd, Gloucester, ON K1J 9L3
</p>`);

  const marker = new mapboxgl.Marker()
    .setLngLat([-75.610474, 45.433556])
    .setPopup(popup)
    .addTo(map);
};
const script = document.createElement("script");
script.src = "https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.js";
script.onload = () => {
  initMap();
};

document.body.appendChild(script);
