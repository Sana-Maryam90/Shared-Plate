'use client';
import GoogleMap from './GoogleMap';
import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const TakeComp = ({ fetchedData }) => {
  const requests = fetchedData;
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const cardRefs = useRef({});
  const [userLocation, setUserLocation] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMarkerClick = (id) => {
    setSelectedRequestId(id);
    if (cardRefs.current[id]) {
      cardRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          console.error('Error getting user location:', error);
          setUserLocation({
            lat: 24.8607,
            lng: 67.0011,
          });
        }
      );
    };

    getUserLocation();
  }, []);


  useEffect(() => {
    const calculateDistanceAndFilter = () => {
      if (userLocation && requests.length > 0) {
        const filtered = requests.filter(request => {
          const distance = calculateDistance(userLocation.lat, userLocation.lng, request.location.latitude, request.location.longitude);
          return distance <= 10;
        });
        setFilteredRequests(filtered);
        console.log(filteredRequests);
      }
    };

    calculateDistanceAndFilter();
  }, [userLocation, requests]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };


  useEffect(() => {
    if (fetchedData && fetchedData.length > 0) {
      setFilteredRequests(fetchedData);
      setLoading(false); // Set loading state to false when data is fetched
    }
  }, [fetchedData]);

  return (
    <main className="font-notoSans 2xl:flex xl:flex lg:flex md:flex h-screen">
      <div className='w-[100%] md:w-[60%] 2xl:w-[70%] xl:w-[70%] lg:w-[70%]'>
        <GoogleMap requests={filteredRequests} userLocation={userLocation} onMarkerClick={handleMarkerClick}/>
      </div>

      <div className='flex flex-col bg-white items-center w-[100%] md:w-[40%] 2xl:w-[30%] xl:w-[30%] lg:w-[30%] overflow-y-auto'>
      {loading ? (
          <div>Loading...</div>
        ) : (
          filteredRequests.map(request => (
            <div key={request._id} ref={(el) => (cardRefs.current[request._id] = el)} className='w-full flex justify-center items-center'>
              <Card
                key={request._id}
                name={request.name}
                organization={request.givingOrg}
                serving={request.foodServing}
                type={request.foodType}
                id={request._id}
              />
            </div>
          ))
        )}
      </div>  
    </main>    
  );
};

export default TakeComp;
