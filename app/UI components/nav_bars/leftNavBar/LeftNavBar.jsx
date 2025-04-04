"use client";
// components/TopNavBar.jsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HiOutlineHome,HiOutlineUserGroup, HiOutlineUsers } from '@node_modules/react-icons/hi2';
import IconComponent from './IconComponent';
import { BsCashCoin, BsMenuUp } from '@node_modules/react-icons/bs';
import { RiSettings2Line} from '@node_modules/react-icons/ri';
import { useSelector,useDispatch } from '@node_modules/react-redux/dist/react-redux';
import { setOverlay } from '@app/UI components/Overlay/reduxSlice/overlayReducer';

const LeftSideNavBar = () => {

  //Get state of showSideNavbar
  const showSideNavBarValue = useSelector((store)=> store.overlay.showSideNavBar);
  const dispatch = useDispatch();
  
  const [windowWidth,setWindowWidth] = useState(0);
  
  const [display, setDisplay] = useState({
    position:"relative", width:"100%",
  });

  //Set effect on nav icon button clicking
  function closeSideBar(){
    if(windowWidth < 1024){
      dispatch(setOverlay({showSideNavBar: false}));
    } 
  }

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

  //For managing the sidebar
  useEffect(()=>{
    if(windowWidth >= 1024){
      dispatch(setOverlay({showSideNavBar: true}));
      setDisplay({ position:"relative", width:"8.3%", zIndex:0 })
    }

    else if(windowWidth < 1024){
      setDisplay({ position:"fixed", width:"100%",zIndex:1})
    }

  },[windowWidth, showSideNavBarValue])

  const sideBarStyle={
    fontSize:"14px",
    //zIndex:1,
  }

  console.log("showSideBarValue "+showSideNavBarValue);

  return (
    showSideNavBarValue ?
    <nav style={{...sideBarStyle,...display}} 
    className='flex self-start h-88vh w-1/12 bg-slate-50 shadow-2xl scrollContainer'>
      <ul className='w-full overflow-y-auto'>

        <li onClick={closeSideBar}>
          <Link href="/dashboard" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <HiOutlineHome/> </IconComponent>
            <span>Home</span>
          </Link>
        </li>

        <li onClick={closeSideBar}>
          <Link href="/employees" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <HiOutlineUserGroup/> </IconComponent>
            <span>Employees</span>
          </Link>
        </li>

        <li onClick={closeSideBar}>
          <Link href="/tasks" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <BsMenuUp/> </IconComponent>
            <span>Tasks</span>
          </Link>
        </li>

        <li onClick={closeSideBar}>
          <Link href="/expenditure" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <BsCashCoin/> </IconComponent>
            <span>Expenditures</span>
          </Link>
        </li>

        <li onClick={closeSideBar}>
          <Link href="/user" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <HiOutlineUsers/> </IconComponent>
            <span>Users</span>
          </Link>
        </li>

        <li onClick={closeSideBar}>
          <Link href="/settings" className='ring-1 flex flex-col w-full py-5
        items-center'>
            <IconComponent> <RiSettings2Line/> </IconComponent>
            <span>Settings</span>
          </Link>
        </li>

      </ul>
    </nav> : <></>
  );
};

export default LeftSideNavBar;
