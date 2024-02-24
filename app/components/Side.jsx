"use client"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useState } from 'react'
import { IoPerson } from "react-icons/io5"
import { IoMenuSharp } from "react-icons/io5"
import { FaHourglassHalf } from "react-icons/fa"
import { MdHistory } from "react-icons/md"
import { FaClock } from "react-icons/fa"
import { MdDoneOutline } from "react-icons/md"
import { FaMotorcycle } from "react-icons/fa6"
import { PiPackageFill } from "react-icons/pi"

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
  return (
 
      <Sidebar
        collapsed={collapsed}
        rootStyles={{
            [`.${'ps-sidebar-container'}`]: {
              backgroundColor: '#E7F5E3',
              height:"100vh",
            },
            [`.${'ps-submenu-content'}`]: {
              backgroundColor: '#E7F5E3',
            },
            [`.${'ps-active'}`]: {
              color: 'green',
              backgroundColor: '#E7F5E3',
            },
            [`.${'ps-menu-root'}`]: {
              backgroundColor: '#E7F5E3',
            },
            [`.${'ps-menu-button'}`]: {
              backgroundColor: '#E7F5E3',
            },
            [`.${'ps-menu-button:hover'}`]: {
              backgroundColor: 'green',
              color:'#E7F5E3'
            },
            [`.${'ps-menu-icon:hover'}`]: {
              backgroundColor: 'green',
              color:'#E7F5E3'
            },
            [`.${'ps-menu-label:hover'}`]: {
              backgroundColor: 'green',
              color:'#E7F5E3'
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
                    <h3 className='font-notosans text-3xl md:text-5xl font-bold text-center'>NAME</h3>
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
            <SubMenu 
                label="Taken Requests"
                icon={<FaMotorcycle />}
            >
            <Item
              title="Current"
              icon={<FaClock />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Previous"
              icon={<MdDoneOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
            <SubMenu 
                label="Given Requests"
                icon={<PiPackageFill/>}
            >
            <Item
              title="Current"
              icon={<FaClock />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Previous"
              icon={<MdDoneOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            </SubMenu>
        </Menu>
      </Sidebar>
  
  )
}

export default Side
