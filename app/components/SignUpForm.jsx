"use client";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUpForm () {
  // States for setting form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Data Validation
    if (!name || !email || !password || isChecked == false) {
      toast.error("Please fill in all fields");
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
    } else if (password.length < 6) {
      toast.error("Password should be atleast 6 character long");
    } else {
      // Post Data using axios
      const signUpData = {
        name,
        email,
        password,
      };
      console.log("Sign Up Data: ", signUpData);
      try {
        const response = await axios({
          url: "http://localhost:3000/api/signup",
          method: "POST",
          data: signUpData,
        });

        console.log("Registration Successfull Response: ", response.data);
        toast.success("Registration successful");

        // Navigate to login Page
        setTimeout(() => {
          router.push("/login");
        }, 1000);

        setName("");
        setEmail("");
        setPassword("");
      } catch (error) {
        if (error.response) {
          if (error.response.status === 409) {
            toast.info("User with provided credentials already exists");
          }
          console.error("Response data:", error.response.data);
        } else {
          toast.error("Form submission failed!");
          console.error("Error:", error.message);
        }
      }
    }
  };

  return (
    <form className="w-full my-8">
      <InputField
        id="name"
        label="Name"
        type="text"
        placeholder="John Doe"
        value={name}
        setter={setName}
        mt="8px"
        mb="24px"
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="johndoe@gmail.com"
        value={email}
        setter={setEmail}
        mt="8px"
        mb="24px"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="********"
        value={password}
        setter={setPassword}
        mt="8px"
        mb="24px"
      />

      <div className="flex gap-4 mb-8 md:mb-12">
        <input
          type="checkbox"
          id="acceptpolicy"
          checked={isChecked}
          onChange={handleCheckboxChange}
          required
          className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-black rounded-sm bg-white mt-1 checked:bg-black checked:border-0"
        />
        <label htmlFor="acceptpolicy" className="text-lg font-notosans">
          I accept the terms and conditions
        </label>
        <svg
          className="absolute w-4 h-4 mt-1 hidden peer-checked:block pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <button
        className="block m-auto btn-primary"
        type="submit"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
    </form>
  );
}