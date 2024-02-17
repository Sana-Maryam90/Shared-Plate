import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const googleMap = () => {
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
                    </GoogleMap>
                )}
            </LoadScript>
        </div>
    );
};

export default googleMap;