"use client";
import InputField from "../components/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "../hooks/UserContext";
import axios from "axios";

export default function GiveForm() {
  // Getting userId from custom hook
  const { user } = useUser();
  const userId = user.userId;
  console.log(userId);

  const [formData, setFormData] = useState({
    name: "",
    givingOrg: "",
    contact: "",
    foodType: "",
    foodServing: "",
    availability: "",
    landmark: "",
    comments: "",
    location: "",
  });

  const resetFormData = () => {
      for (let key in formData) {
          formData[key] = "";
      }
  }

  const validContact = () => {
    const regex = /^\d{11}$/;
    return regex.test(formData.contact);
  };

  const validCurrentTime = () => {
    // Get the current date and time
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    // Parse the time string entered in the input field
    const [hours, minutes] = formData.availability.split(":").map((num) => parseInt(num, 10));

    // Compare the entered time with the current time
    if (
      hours > currentHours ||
      (hours === currentHours && minutes > currentMinutes)
    ) {
      return true; // Entered time is after current time
    }
    else return false; // Entered time is not after current time
  };

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Data Validation
    if (
      !formData.name ||
      !formData.givingOrg ||
      !formData.contact ||
      !formData.foodType ||
      !formData.foodServing ||
      !formData.availability ||
      !formData.landmark ||
      !formData.location
    ) {
      toast.error("Please fill in all fields");
    } else if (!validContact()) {
      toast.error("Please enter a valid contact number");
    } else if (!validCurrentTime()) {
      toast.error("Please enter a valid availabilty time");
    } else {
      // Post Data using axios
      const formDataWithUserId = {
        ...formData,
        userId: userId,
      };
      console.log("formDataWithUserId Data: ", formDataWithUserId);
      try {
        const response = await axios({
          url: "",
          method: "POST",
          data: formDataWithUserId,
        });

        console.log(
          "Give Form successful submission Response: ",
          response.data
        );
        toast.success("Request Successful");

        // Navigate to Home Page
        setTimeout(() => {
          router.push("/");
        }, 1000);

        resetFormData();
      } catch (error) {
        if (error.response) {
          toast.error("Invalid Details");
          console.error(
            "Request failed with status code",
            error.response.status
          );
          console.error("Response data:", error.response.data);
        } else {
          toast.error("Form submission is failed");
          console.error("Error during request setup:", error.message);
        }
      }
    }
  }
  return (
    <form className="w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2 my-5 md:my-10">
      <p className="font-notosans text-xl md:text-2xl font-semibold mb-2 lg:mb-4">
        Giver Details
      </p>
      <div className="w-full lg:flex lg:items-center lg:gap-10">
        <InputField
          id="name"
          label="Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          setter={(value) => handleInputChange("name", value)}
          mt="8px"
          mb="32px"
        />
        <InputField
          id="givingOrg"
          label="Giving Organization"
          type="text"
          placeholder="ABC Restaurant/Welfare/Individual"
          value={formData.givingOrg}
          setter={(value) => handleInputChange("givingOrg", value)}
          mt="8px"
          mb="32px"
        />
      </div>
      <div className="w-full lg:flex lg:items-center lg:gap-10">
        <InputField
          id="contact"
          label="Contact"
          type="tel"
          placeholder="12345678910"
          value={formData.contact}
          setter={(value) => handleInputChange("contact", value)}
          mt="8px"
          mb="32px"
        />
        <InputField
          id="fdtype"
          label="Food Type"
          type="text"
          placeholder="Cooked/Packaged/Biryani..."
          value={formData.foodType}
          setter={(value) => handleInputChange("foodType", value)}
          mt="8px"
          mb="32px"
        />
      </div>
      <div className="w-full lg:flex lg:items-center lg:gap-10">
        <InputField
          id="serving"
          label="Food Serving"
          type="number"
          placeholder="2 people"
          value={formData.foodServing}
          setter={(value) => handleInputChange("foodServing", value)}
          min="1"
          mt="8px"
          mb="32px"
        />
        <InputField
          id="availability"
          label="Availabile Uptil"
          type="time"
          placeholder="Food is available uptil this time from now"
          value={formData.availability}
          setter={(value) => handleInputChange("availability", value)}
          mt="8px"
          mb="32px"
        />
      </div>
      <div className="w-full lg:flex lg:items-center lg:gap-10">
        <InputField
          id="landmark"
          label="Nearest Landmark"
          type="text"
          placeholder="School/Hospital"
          value={formData.landmark}
          setter={(value) => handleInputChange("landmark", value)}
          mt="8px"
          mb="32px"
        />
        <InputField
          id="comments"
          label="Additional Information"
          type="text"
          placeholder="Food is vegetarian"
          value={formData.comments}
          setter={(value) => handleInputChange("comments", value)}
          mt="8px"
          mb="32px"
        />
      </div>
      <div className="w-full lg:flex lg:items-center lg:gap-10">
        <InputField
          id="location"
          label="Select Location"
          type="text"
          placeholder="ABC Street..."
          value={formData.location}
          setter={(value) => handleInputChange("location", value)}
          mt="8px"
          mb="32px"
        />
      </div>
      <button
        className="block m-auto btn-primary"
        type="submit"
        onClick={handleSubmit}
      >
        Proceed
      </button>
    </form>
  );
}
