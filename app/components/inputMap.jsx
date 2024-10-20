// "use client"

// import { GoogleMap, Marker, useJsApiLoader, LoadScript } from "@react-google-maps/api";
// import { useState, useEffect } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// function Map({ onLocationSelect }) {
//   const [userLocation, setUserLocation] = useState(null);
//   const [map, setMap] = useState(null);
//   const [markerPosition, setMarkerPosition] = useState(null);


//   useEffect(() => {
//     const getUserLocation = () => {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setMarkerPosition({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         },
//         error => {
//           console.error('Error getting user location:', error);
//           setMarkerPosition({
//             lat: 24.8607,
//             lng: 67.0011,
//           });
//         }
//       );
//     };

//     getUserLocation();
//   }, []);

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   const onMarkerDragEnd = (event) => {
//     const newPosition = {
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     };
//     // setMarkerPosition(newPosition);
//     setMarkerPosition(newPosition);
//     onLocationSelect(newPosition);
//   };

//   return(
//     <LoadScript googleMapsApiKey="AIzaSyBHaVsSMzCC1gB70fBC2fHqqWkFq6xP8X0">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={markerPosition}
//         zoom={15}
//         onLoad={setMap} // Use setMap directly as onLoad handler
//       >
//         {map && ( // Render Marker only when map is loaded
//           <Marker
//             position={markerPosition}
//             draggable={true}
//             onDragEnd={onMarkerDragEnd}
//           />
//         )}
//       </GoogleMap>
//     </LoadScript>
//   )
// }

// export default Map;




"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultLocation = { lat: 24.8607, lng: 67.0011 }; // Fallback for Karachi

function Map({ onLocationSelect }) {
  const [userLocation, setUserLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultLocation);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_API_KEY, // Make sure this is secure in production!
  });

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setMarkerPosition(userPos);
            setUserLocation(userPos);
          },
          (error) => {
            console.error("Error getting user location:", error);
            // Keep default location as fallback
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);

  const onMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    onLocationSelect(newPosition); // Notify parent about location change
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition || defaultLocation} // Use markerPosition or fallback
      zoom={15}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={onMarkerDragEnd}
      />
    </GoogleMap>
  ) : (
    <div>Loading map...</div>
  );
}

export default Map;
