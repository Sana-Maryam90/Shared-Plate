import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const googleMap = () => {
    const containerStyle = {
        width: '100%',
        height: '80vh',
    };
      
    const center = {
        lat: -3.745,
        lng: -38.523,
    };
  return (
    <div>
        <LoadScript 
            googleMapsApiKey="AIzaSyAKYskp6eLCjFWOexdDxi7RsKqyng6OiuI"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
            >
            </GoogleMap>
        </LoadScript>
      
    </div>
  )
}

export default googleMap
