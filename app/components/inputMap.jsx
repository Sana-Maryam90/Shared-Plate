"use client"

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
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


  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyBHaVsSMzCC1gB70fBC2fHqqWkFq6xP8X0', // Add your Google Maps API key here
  });

  // const onLoad = (map) => {
  //   setMap(map);
  // };

  const onMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    // setMarkerPosition(newPosition);
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={15}
      // onLoad={onLoad}
    >
      <Marker
        position={markerPosition}
        draggable={true} // Make the marker draggable
        onDragEnd={onMarkerDragEnd} // Handle marker drag end event
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
