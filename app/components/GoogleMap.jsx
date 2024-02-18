import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const googleMap = ({ requests }) => {
    const containerStyle = {
        width: '100%',
        height: '80vh',
    };

    const [userLocation, setUserLocation] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        // Fetch user's location
        navigator.geolocation.getCurrentPosition(
            position => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            error => {
                console.error('Error getting user location:', error);
                // Handle errors, fallback to default location
                setUserLocation({
                    lat: 24.8607,
                    lng: 67.0011,
                });
            }
        );
    }, []);

    const handleMarkerClick = (request) => {
        setSelectedRequest(request);
    };

    const handleInfoWindowClose = () => {
        setSelectedRequest(null);
    };

    return (
        <div>
            <LoadScript 
                googleMapsApiKey="AIzaSyBHaVsSMzCC1gB70fBC2fHqqWkFq6xP8X0"
            >
                {userLocation && (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={userLocation}
                        zoom={15}
                    >
                        {/* Marker for user's location */}
                        <Marker
                            position={userLocation}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                                scaledSize: new window.google.maps.Size(30,30),
                            }}
                        />

                        {requests.map((request, index) => (
                            <Marker
                                key={index}
                                position={{ lat: request.location.latitude, lng: request.location.longitude }}
                                onClick={() => handleMarkerClick(request)}
                            >
                                {selectedRequest === request && (
                                    <InfoWindow onCloseClick={handleInfoWindowClose}>
                                        <div>
                                            <h3>{request.name}</h3>
                                            <p>{request.foodtype}</p>
                                            <a href={`https://www.google.com/maps?q=${request.location.latitude},${request.location.longitude}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>
                        ))}
                    </GoogleMap>
                )}
            </LoadScript>
        </div>
    );
};

export default googleMap;

