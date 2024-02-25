import React from 'react'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import axios from 'axios';

const Logout = () => {
    const router=useRouter();
    const handleLogout=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios ({
            url:"http://localhost:3000/api/logout",
            method:"POST"
        })
        console.log("Logout Successful Response:",response.data);
        toast.success("Logout successful!");

        //navigate to home page
        setTimeout(()=>{router.push('/')},1000);
    }catch(error){
        
        console.error("Request failed with status code",error.response.status);
        toast.error("Logout failed")
    }
}

  return (
    <div>
      <button className="btn-primary mb-3" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
