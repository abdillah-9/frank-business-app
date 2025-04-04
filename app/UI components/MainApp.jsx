"use client";
import { useSelector } from '@node_modules/react-redux/dist/react-redux'
import React, { useEffect, useState } from 'react'

export default function MainApp({children}) {

    //get Redux value
    const showSideNavBarValue = useSelector((store)=>{store.overlay.showSideNavBar});
             
  const [windowWidth,setWindowWidth] = useState(0);

  //For handling and listening for window width change
  useEffect(()=>{

    if(typeof window !== "undefined"){
        setWindowWidth(window.innerWidth);
    }
    const handleResize =()=>{
        setWindowWidth(window.innerWidth);
    } 

    window.addEventListener("resize",handleResize);

    return ()=> {
      window.removeEventListener("resize",handleResize)
    }

  },[]);

    const [width, setWidth] = useState();

    useEffect(()=>{
        if(windowWidth >= 1024) { setWidth("91.667%") }
        else { setWidth("100vw") }  
    },
    [windowWidth])
  
    const mainStyle={
        //'w-11/12 shadow-2xl h-88vh'
        width: width,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
        height:"88vh",
      }

  return (
    <div style={mainStyle}>
      {children}
    </div>
  )
}
