'use strict';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFwcHlzIiwiYSI6ImNraGE3d241MzBoNW8yc2xoOTVlbDdodjgifQ.eIKTbvM1I7qbO5YlfcfQlQ';
const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [24, 60], // starting position [lng, lat]
  zoom: 13, // starting zoom
});

const addMarker = (coords) => {
  map.setCenter(coords);
  const marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
};