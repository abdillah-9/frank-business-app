"use client"
import useUser from '@app/authentication/hooks/useUser'
import Image from '@node_modules/next/image'
import { HiOutlineUser, HiOutlineUserCircle, HiUser, HiUserCircle } from '@node_modules/react-icons/hi2'
import {RiShieldUserFill} from "react-icons/ri"
import {PiUserCircleLight} from "react-icons/pi"
import React from 'react'

export default function ActiveUser() {
  const {user} = useUser();
  
  let fullName="active user"; let avatar="";
  user? {fullName, avatar} = user.user_metadata :""

  return (
    <div style={activeUserDiv}>
      {
        avatar? <div style={imageDivStyle}>
                  <Image src={avatar} width={40} height={40} alt="User" style={imageStyle}/>
                </div> 
              : 
                <HiOutlineUser style={iconStyle}/>
      }
        
        <div>{fullName}</div>      
    </div>
  )
}

const activeUserDiv={
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    fontSize:"14px",
    gap:"3px",
}
const iconStyle ={
  fontSize:"20px",
}
const imageDivStyle={
  padding:"3px",
}
const imageStyle={
  width:"45px",
  height:"40px",
  borderRadius:"50%",
}