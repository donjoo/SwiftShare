import React, { useState, useEffect } from "react";
import Map from "react-map-gl";

const MapboxAccessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your token

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749, // Default location (San Francisco)
    longitude: -122.4194,
    zoom: 12,
  });

  return (
    <Map
      initialViewState={viewport}
      style={{ width: "100%", height: "500px" }}
      mapStyle="mapbox://styles/mapbox/streets-v12" // Replace with your Mapbox style URL
      mapboxAccessToken={MapboxAccessToken}
      onViewportChange={(newViewport) => setViewport(newViewport)}
    />
  );
};

export default MapComponent;
