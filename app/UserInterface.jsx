"use client"
import React, { useState } from 'react'
import RightSide from './RightSide';
import LeftNavBar from './reusables/UI_components/nav_bars/leftNavBar/LeftNavBar';
import UserAuth from './authentication/UserAuth';

export default function UserInterface({children}) {
    const [isActiveLink, setActiveLink] = useState("dashboard");
  return (
    <div style={container}>
        <UserAuth isActiveLink={isActiveLink} setActiveLink={setActiveLink}/>
        <RightSide isActiveLink={isActiveLink} setActiveLink={setActiveLink} children={children} />
        <LeftNavBar isActiveLink={isActiveLink} setActiveLink={setActiveLink} children={children} />
    </div>
  )
}
const container={
    display:"flex",
    flexDirection:"row-reverse",
    width:"100%",
}
