"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutComponent from './LogoutComponent';
import ActiveUser from './ActiveUser';
import IconComponent from '../leftNavBar/IconComponent';
import { HiOutlineMenuAlt2,HiOutlineMenuAlt3} from '@node_modules/react-icons/hi';
import {CiMenuFries} from "react-icons/ci"
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import { setOverlay } from '@app/UI components/Overlay/reduxSlice/overlayReducer';

const TopNavBar = () => {

  //Redux dispatcher
  const showSideNavBarValue =  useSelector((store)=> store.overlay.showSideNavBar)
  const dispatch = useDispatch();

  const [isClient,setIsClient] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [navBarIsOpen, setNavBarIsOpen] = useState(false);

  useEffect(()=>{
    setIsClient(true);
    setWindowSize(window.innerWidth);

    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }
  ,[windowSize])
  
  function actionHandler (){
    dispatch(setOverlay({showSideNavBar: !showSideNavBarValue}));
    setNavBarIsOpen(!navBarIsOpen)
  }

  console.log("after click "+showSideNavBarValue)
  return (
    <nav className='flex justify-between items-center h-12vh bg-sky-500 shadow-2xl p-5 py-3'
    style={{maxHeight:"fit-content",minHeight:"fit-content", backgroundColor:"rgb(14, 165, 233)"}}>
      <div style={divStyle}>
        <Link href="/dashboard">
        <Image
          src="assets/images/logo.svg" 
          alt="Company logo"
          width={50}
          height={50}
        />
        </Link>
        <IconComponent iconStyle={iconStyle} actionHandler={actionHandler}>
          {
            isClient && (
            window.innerWidth >= 1024 ? "" :
            (navBarIsOpen ? <HiOutlineMenuAlt3/> : <HiOutlineMenuAlt2/>)
          )
          }
        </IconComponent>
      </div>
      <ul style={navRightStyle}>
      <li>
        <ActiveUser/>
      </li>
      <li>
        <LogoutComponent/>
      </li>
      </ul>
    </nav>
  );
};

//css 
const navRightStyle={
  display:"flex",
  justifyContent:"flex-end",
  alignItems:"center",
  gap:"20px",
}
const divStyle={
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  gap:"20px",
}

const iconStyle={
  fontSize:"21px",
  //color:"rgb(100, 86, 72)",
  color:"black",
  cursor:"pointer",
}
export default TopNavBar;
