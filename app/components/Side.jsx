"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState,useEffect } from 'react'
import { IoPerson } from "react-icons/io5"
import { IoMenuSharp } from "react-icons/io5"
import { FaHourglassHalf } from "react-icons/fa"
import { MdHistory } from "react-icons/md"
import { FaMotorcycle } from "react-icons/fa6"
import { PiPackageFill } from "react-icons/pi"
import { BiLogOut } from "react-icons/bi";
import { useUser } from "../hooks/UserContext"
import axios from 'axios'

const Item = ({ title, to, icon, selected, setSelected }) => {
    return (
      <MenuItem
        active={selected === title}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        {title}
      </MenuItem>
    );
};
const Side = () => {
    const [collapsed,setCollapsed]=useState(false)
    const [selected, setSelected] = useState("Personal Information");

        // Getting the authenticated userID
  const { user } = useUser();
  const userId = user.userId;
  const [userName, setUserName] = useState([]);

  useEffect(()=>{
    //console.log('Fetching data for user:', userId);
    const fetchData = async(userId)=>{
      try{
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
        //console.log('Response data:', response.data);
        setUserName(response.data.result);
      }catch(error){
        console.error('Error fetching data:', error);
      }
    }
    fetchData(userId);
  },[userId])

  return (
 
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
            [`.${'ps-sidebar-container'}`]: {
              backgroundColor: '#E7F5E3',
              height:"100vh",
            },
            [`.${'& .pro-icon-wrapper'}`]: {
              backgroundColor:'transparent',
            },
            [`.${'& .ps-menu-icon'}`]: {
              backgroundColor: "transparent !important",
            },
            [`.${'& .pro-inner-item'}`]: {
              backgroundColor: "5px 35px 5px 20px ",
            },
            [`.${'& .ps-menu-button'}`]: {
              backgroundColor: "5px 35px 5px 20px ",
            },
            [`.${'& .ps-menu-button:hover'}`]: {
              color: "#868dfb ",
              backgroundColor:"green "
            },
            [`.${'& .ps-menu-label:hover'}`]: {
              color: "#868dfb",
              backgroundColor:"green"
            },
            [`.${'& .ps-active'}`]: {
               color: "#6870fa",
            },
          }}
      >
        <Menu iconShape="square">
           <MenuItem 
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <IoMenuSharp/> : undefined}
                style={{
                    margin: "10px 0 20px 0",
                }}
            >
           {!collapsed && (
              <div className='flex justify-center items-center '>

                <button onClick={() => setCollapsed(!collapsed)}>
                    <h3 className='font-notosans text-3xl md:text-5xl font-bold text-center'>{userName.name}</h3>
                </button>
              </div>
            )}
           </MenuItem>
            <Item
              title="Personal Information"
              icon={<IoPerson />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Ongoing Requests"
              icon={<FaHourglassHalf />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="History"
              icon={<MdHistory/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Taken Requests"
              icon={<FaMotorcycle />}
              selected={selected}
              setSelected={setSelected}
            />
            
            <Item
              title="Given Requests"
              icon={<PiPackageFill/>}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Logout"
              icon={<BiLogOut/>}
              selected={selected}
              setSelected={setSelected}
            />
        </Menu>
      </Sidebar>
  
  )
}

export default Side
