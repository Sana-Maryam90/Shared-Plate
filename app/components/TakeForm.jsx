"use client";
import InputField from "./InputField";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Map from "./inputMap";
import { getCurrentUser } from "./GetUser";

export default function TakeForm({ requestId }) {
  const [userId, setUserId] = useState([]);
  
  // Get the current user data from the backend API
  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await getCurrentUser();
      setUserId(userDetails.userId);
    };

    fetchUser();
  }, []);


  //new
  const [selectedLocation, setSelectedLocation] = useState(null);

  //new
  const handleLocationSelect = (location) => {
    setSelectedLocation({
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  // Getting the Give Request ID, for which the user is sending a delivery request
  const giveRequestId = "";

  //Form Data states
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comments, setComments] = useState("");
  // const [location, setLocation] = useState("");

  // To check the validity of contact
  const validContact = () => {
    const regex = /^\d{11}$/;
    return regex.test(contact);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Data Validation
    if (!name || !contact || !location) {
      toast.error("Please fill in all fields");
    } else if (!validContact()) {
      toast.error("Please enter a valid contact number");
    } else {
      // Post Data using axios
      const takeFormData = {
        name,
        contact,
        comments,
        location: selectedLocation,
        userId,
        requestId,
      };
      // console.log("Take Form Data: ", takeFormData);
      try {
        const response = await axios({
          url: "http://localhost:3000/api/take",
          method: "POST",
          data: takeFormData,
        });

        // console.log(
        //   "Take Form successful submission Response: ",
        //   response.data
        // );
        toast.success("Request Successful");

        // Navigate to Home Page
        setTimeout(() => {
          router.push("/");
        }, 1000);

        // Clear form after successful submission
        setName("");
        setContact("");
        setComments("");
        setLocation("");
      } catch (error) {
        if (error.response) {
          toast.error("Invalid Details");
          console.error(
            "Request failed with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        } else {
          // toast.error("Form submission is failed");
          console.error("Error during request setup:", error.message);
        }
      }
    }
  };
  return (
    <form className="w-full md:w-4/5 lg:w-full p-6 xl:pl-12">
      <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-4">
        Deliverer Details
      </p>
      <div className="flex flex-col lg:flex-row lg:space-x-6 ">
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="John Doe"
          value={name}
          setter={setName}
          mt="8px"
          mb="32px"
        />

        <InputField
          id="contact"
          label="Contact"
          type="tel"
          placeholder="12345678910"
          value={contact}
          setter={setContact}
          mt="8px"
          mb="32px"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <InputField
          id="comments"
          label="Additional Information"
          type="text"
          placeholder="Food is vegetarian"
          value={comments}
          setter={setComments}
          mt="8px"
          mb="32px"
        />

        {/* <InputField
        id="location"
        label="Select Location"
        type="text"
        placeholder="ABC Street..."
        value={location}
        setter={setLocation}
        mt="8px"
        mb="32px"
      /> */}

        <InputField
          id="location"
          label="Select Location"
          type="text"
          readOnly
          placeholder="Select Location on Map"
          value={
            selectedLocation
              ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
              : ""
          }
          setter={setSelectedLocation}
          mt="8px"
          mb="32px"
        />
      </div>

      <div className="h-64 md:h-80">
        <Map onLocationSelect={handleLocationSelect} />
      </div>
      <button
        className="block m-auto my-9 btn-primary"
        type="submit"
        onClick={handleSubmit}
      >
        Send
      </button>
    </form>
  );
}