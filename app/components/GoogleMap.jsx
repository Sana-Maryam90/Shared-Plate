// "use client"


// import React, { useEffect, useState } from 'react';
// import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


// const googleMap = ({ requests, userLocation, onMarkerClick }) => {
//     const containerStyle = {
//         width: '100%',
//         height: '100vh',
//     };

//     const [selectedRequest, setSelectedRequest] = useState(null);

    
//     const handleMarkerClick = (request) => {
//         setSelectedRequest(request);
//         onMarkerClick(request._id); // Pass the id of the clicked marker to the parent component
//     };


//     const handleInfoWindowClose = () => {
//         setSelectedRequest(null);
//     };

//     return (
//         <div>
//             <LoadScript 
//                 googleMapsApiKey="AIzaSyBHaVsSMzCC1gB70fBC2fHqqWkFq6xP8X0"
//             >
//                 {/* new */}
//                 {userLocation && (
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={userLocation}
//                         zoom={15}
//                     >
//                         {/* Marker for user's location */}
//                         <Marker
//                             position={userLocation}
//                             icon={{
//                                 url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//                                 // scaledSize: new window.google.maps.Size(30, 30),
//                             }}
//                         />

//                         {requests.map((request, index) => (
//                             <Marker
//                                 key={index}
//                                 position={{ lat: request.location.latitude, lng: request.location.longitude }}
//                                 onClick={() => handleMarkerClick(request)}
//                             >
//                                 {selectedRequest === request && (
//                                     <InfoWindow onCloseClick={handleInfoWindowClose}>
//                                         <div>
//                                             <h3>{request.name}</h3>
//                                             <p>{request.foodType}</p>
//                                             <p>Servings: {request.foodServing}</p>
//                                             <a href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
//                                         </div>
//                                     </InfoWindow>
//                                 )}
//                             </Marker>
//                         ))}
//                     </GoogleMap>
//                 )}
//             </LoadScript>
//         </div>
//     );
// };

// export default googleMap;




"use client";

import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const defaultZoom = 15;

const GoogleMapComponent = ({ requests, userLocation, onMarkerClick }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Load Google Maps script asynchronously
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_API_KEY, // Make sure this is secure in production!
  });

  const handleMarkerClick = (request) => {
    setSelectedRequest(request);
    onMarkerClick(request._id); // Pass the id of the clicked marker to the parent component
  };

  const handleInfoWindowClose = () => {
    setSelectedRequest(null);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      {userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={defaultZoom}
        >
          {/* Marker for user's location */}
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />

          {/* Markers for requests */}
          {requests.map((request) => (
            <Marker
              key={request._id} // Assuming request._id is unique
              position={{
                lat: request.location.latitude,
                lng: request.location.longitude,
              }}
              onClick={() => handleMarkerClick(request)}
            >
              {selectedRequest?._id === request._id && (
                <InfoWindow onCloseClick={handleInfoWindowClose}>
                  <div>
                    <h3>{request.name}</h3>
                    <p>{request.foodType}</p>
                    <p>Servings: {request.foodServing}</p>
                    <a
                      href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default GoogleMapComponent;
