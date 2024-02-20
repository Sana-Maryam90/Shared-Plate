'use client';
import GoogleMap from '../components/GoogleMap';
import React, {useState, useEffect, useRef} from 'react'
import Card from '../components/Card';
import { FaCircleDot } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";



const Take = () => {
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const cardRefs = useRef({});

  const handleMarkerClick = (id) => {
    setSelectedRequestId(id);
    // Scroll to the card with the selectedRequestId
    if (cardRefs.current[id]) {
      cardRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    console.log("Selected Marker ID:", selectedRequestId);
  }, [selectedRequestId]);


    const [userLocation, setUserLocation] = useState(null);
    const [filteredRequests, setFilteredRequests] = useState([]);

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

    useEffect(() => {
      if (userLocation) {
          const filtered = requests.filter(request => {
              // Calculate distance between userLocation and request's location
              const distance = calculateDistance(userLocation.lat, userLocation.lng, request.location.latitude, request.location.longitude);
              // Filter requests within 10km range
              return distance <= 10;
          });
          console.log(filtered);
          setFilteredRequests(filtered);
      }
  }, [userLocation]);

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
        console.log({distance});
        return distance;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const requests = [
      {
        id: 1,
        name: "John Doe",
        organization: "Community Kitchen",
        foodtype: "Pasta",
        location: { latitude: 24.91958236034102, longitude: 67.09738983659071 }
      },
      {
        id: 2,
        name: "Alice Smith",
        organization: "Local Church",
        foodtype: "Burgers",
        location: { latitude: 24.951316863001107, longitude: 67.16312097762261 }
      },
      {
        id: 3,
        name: "Michael Johnson",
        organization: "Food Bank",
        foodtype: "Vegetarian",
        location: {  
          latitude: 24.961257535575648, 
          longitude: 67.22841441398275 }
      },
      {
        id: 4,
          name: "Sarah Brown",
          organization: "Community Center",
          foodtype: "Pizza",
          location: {
            latitude: 24.93192264458337,  // Randomizing within ±0.025 degrees
            longitude:67.24830571988804
          }
        },
        {
          id: 5,
          name: "David Wilson",
          organization: "Charity Organization",
          foodtype: "Sandwiches",
          location: {
            latitude: 24.88306008994651, 
            longitude: 67.16037190597928
          }
        },
        {
          id: 6,
          name: "Emily Davis",
          organization: "Food Drive",
          foodtype: "Salads",
          location: {
            latitude: 24.891339817401313,
            longitude:  67.09737122276798
          },
      }
    ];

    return (
        <main className="font-notoSans 2xl:flex xl:flex lg:flex md:flex h-screen">
            {/*big screens*/}
            <div className='w-[100%] md:w-[60%] 2xl:w-[70%] xl:w-[70%] lg:w-[70%]'>
                <GoogleMap requests={filteredRequests} userLocation={userLocation} onMarkerClick={handleMarkerClick}/>
                <div className=' bg-white text-black flex-row m-5 p-2'>
                    <div className='flex justify-center items-center'>
                        <FaCircleDot className='text-xl font-semibold' color='#9CA3AF' />
                        <input 
                            placeholder='Enter location here'
                            className='bg-transparent w-full pt-2 pb-3 pl-2 text-xl  border-b-4 border-e-gray-950 focus:outline-none font-semibold'
                        />
                    </div>
                    <div className='flex justify-center items-center'>
                        <FaMapMarkerAlt className='text-sky-500 font-semibold text-xl'/>
                        <div className='w-full pt-2 pb-3 pl-2 text-xl text-sky-500 font-semibold'>Choose on map</div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-green  items-center w-[100%] md:w-[40%] 2xl:w-[30%] xl:w-[30%] lg:w-[30%] overflow-y-auto'>
           {filteredRequests.map((request) => (
            <div key={request.id} ref={(el) => (cardRefs.current[request.id] = el)}>
              <Card
                key={request.id}
                name={request.name}
                organization={request.organization}
                type={request.foodtype}
                id={request.id}
              />
            </div>
            ))}
           </div>  
        </main>    
    )
}

export default Take;




