"use client"

import { GoogleMap, Marker, useJsApiLoader, LoadScript } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

function Map({ onLocationSelect }) {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);


  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting user location:', error);
          setMarkerPosition({
            lat: 24.8607,
            lng: 67.0011,
          });
        }
      );
    };

    getUserLocation();
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const onMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // setMarkerPosition(newPosition);
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition);
  };

  return(
    <LoadScript googleMapsApiKey="AIzaSyBHaVsSMzCC1gB70fBC2fHqqWkFq6xP8X0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
        onLoad={setMap} // Use setMap directly as onLoad handler
      >
        {map && ( // Render Marker only when map is loaded
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map;
