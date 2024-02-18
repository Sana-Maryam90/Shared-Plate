

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const googleMap = ({ requests }) => {
    const containerStyle = {
        width: '100%',
        height: '80vh',
    };

    const [userLocation, setUserLocation] = useState(null);

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
                                scaledSize: new window.google.maps.Size(30, 30),
                            }}
                        />

                        {requests.map((request, index) => (
                                <Marker
                                    key={index}
                                    position={{ lat: request.location.latitude, lng: request.location.longitude }}
                                />
                                ))}
                    </GoogleMap>
                )}
            </LoadScript>
        </div>
    );
};

export default googleMap;
