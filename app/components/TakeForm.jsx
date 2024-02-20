"use client";
import InputField from "./InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUser } from "../hooks/UserContext";
import axios from "axios";

export default function TakeForm () {
  // Getting the authenticated userID
  const { user } = useUser();
  const userId = user.userId;

  // Getting the Give Request ID, for which the user is sending a delivery request
  const giveRequestId = "";

  //Form Data states
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [comments, setComments] = useState("");
  const [location, setLocation] = useState("");

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
        location,
        userId,
        giveRequestId,
      };
      console.log("Take Form Data: ", takeFormData);
      try {
        const response = await axios({
          url: "",
          method: "POST",
          data: takeFormData,
        });

        console.log(
          "Take Form successful submission Response: ",
          response.data
        );
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
          toast.error("Form submission is failed");
          console.error("Error during request setup:", error.message);
        }
      }
    }
  };
  return (
    <form className="w-3/4 md:w-1/2 lg:w-3/4 xl:w-3/5 my-5 md:my-10">
      <p className="font-notosans text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-4">
        Deliverer Details
      </p>
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

      <InputField
        id="location"
        label="Select Location"
        type="text"
        placeholder="ABC Street..."
        value={location}
        setter={setLocation}
        mt="8px"
        mb="32px"
      />

      <button
        className="block m-auto btn-primary"
        type="submit"
        onClick={handleSubmit}
      >
        Send
      </button>
    </form>
  );
}