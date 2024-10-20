"use client";
import InputField from "../components/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

export default function LoginForm () {
  // States for setting form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleCheckboxChange = () => {
    setRememberMe(!isRememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Data Validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address");
    } else {
      // Post Data using axios
      const loginData = {
        email,
        password,
        isRememberMe,
      };
      // console.log("Login Data: ", loginData);
      try {
        const response = await axios({
          url: "http://localhost:3000/api/login",
          method: "POST",
          data: loginData,
        });

        console.log("Login Successfull Response: ", response.data);
        toast.success("Login successful");

        // Navigate to login Page
        setTimeout(() => {
          router.push("/");
        }, 1000);

        setEmail("");
        setPassword("");
        setRememberMe(false);
      } catch (error) {
        if (error.response.status === 401) {
          if (error.response.data.message === "Invalid password") {
            toast.error("Invalid password");
          } else {
            toast.error("Invalid Credentials, User not registered");
          }
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
    <form className="my-12">
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="johndoe@gmail.com"
        value={email}
        setter={setEmail}
        mt="8px"
        mb="32px"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="********"
        value={password}
        setter={setPassword}
        mt="8px"
        mb="32px"
      />

      <div className="flex gap-4 mb-12">
        <input
          type="checkbox"
          id="remember"
          checked={isRememberMe}
          onChange={handleCheckboxChange}
          required
          className="relative peer shrink-0 appearance-none w-4 h-4 border-2 border-black rounded-sm bg-bgwhite mt-1 checked:bg-black checked:border-0"
        />
        <label htmlFor="remenber" className="text-lg font-notosans">
          Remember Me
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
        Login
      </button>
    </form>
  );
}