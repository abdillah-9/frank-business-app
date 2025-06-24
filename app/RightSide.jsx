"use client"
import React, { useState } from 'react'
import TopNavBar from './reusables/UI_components/nav_bars/topNavBar/TopNavBar';
import DynamicPage from './Dynamic';

export default function RightSide({children, setActiveLink, isActiveLink}) {

  return (
    <div style={rightSide}>
      <TopNavBar isActiveLink={isActiveLink} setActiveLink={setActiveLink} />
      <DynamicPage isActiveLink={isActiveLink} setActiveLink={setActiveLink} children={children}/>
    </div>
  )
}
const rightSide={
  width:"100%",
  padding:"0px 10px 0px 10px",
  // backgroundColor:"rgb(235,235,235)",
  backgroundColor:"white",
}
