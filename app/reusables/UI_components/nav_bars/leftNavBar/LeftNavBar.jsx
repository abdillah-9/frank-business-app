"use client";
import React, { useEffect, useState } from 'react';
import NavBarTemp from '../NavBarTemp';
import { GiMoneyStack } from '@node_modules/react-icons/gi';
import { CiMoneyBill } from '@node_modules/react-icons/ci';
import { HiOutlineUser } from '@node_modules/react-icons/hi2';
import { RiHome9Line } from '@node_modules/react-icons/ri';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import Link from '@node_modules/next/link';
import { setReduxState } from '@app/provider/redux/reducer';
import { BsRobot } from '@node_modules/react-icons/bs';
import {VscRobot} from "@node_modules/react-icons/vsc"
import { IoSettingsOutline } from '@node_modules/react-icons/io5';
import { FaPhp } from '@node_modules/react-icons/fa6';
import { usePathname } from 'next/navigation';

const LeftNavBar = () => {

//get current path
let currentPath = usePathname();

console.log(currentPath)
const dispatch = useDispatch(); 
const isVisible = useSelector((store)=>store.ReduxState.showNavBar);
const [extraStyle,setExtraStyle] = useState({width:"15vw", position:"relative"});
const {windowSize} = useWindowSize();

const windowWidth = windowSize.windowWidth; 

const linkClickEvent= (clickedLink)=>{
  dispatch(setReduxState({overlay:false,showNavBar:windowWidth < 1024 && false}));
}

useEffect(() => {
  if (windowWidth < 1024 && windowWidth > 480) { setExtraStyle({width:"50vw", position:"fixed"})}
  else if(windowWidth <= 480){setExtraStyle({width:"60vw", position:"fixed"})}
  else{setExtraStyle({width:"15vw", position:"relative"})}
}, [windowWidth]);

  //CSS objects
  const activeLink={
    // backgroundColor:"rgb(235,235,235)",
    backgroundColor:"white",
    color:"rgba(79, 8, 161, 0.76)",
    borderRadius:"15px 0px 0px 15px",
  }
  const nonActiveLink={
    color:"white",
  }
  const navBarTempStyle = {
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    ...extraStyle,
    minWidth:"180px",
    backgroundColor:"rgba(79, 8, 161, 0.76)",
    height:"100vh",
    padding:"10px 0px 10px 20px",
    zIndex:1,
    top:0,left:0,
  }

  return (  

    windowSize.windowWidth >= 1024 || (windowSize.windowWidth <= 1024 && isVisible == true) ?
    <NavBarTemp navBarTempStyle={navBarTempStyle}>


      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle_Logo}>
        <NavBarTemp.NavImage imageAttributes={imageAttributes}/>
        <NavBarTemp.NavText navTextStyle={navTextStyle_Logo}>PERSONAL FINANCE APP</NavBarTemp.NavText>        
      </NavBarTemp.NavContainer> 
      

      <div style={currentPath.startsWith("/dashboard") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><RiHome9Line/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
              <Link href="/dashboard" onClick={()=>linkClickEvent("dashboard")} >
                Dashboard
              </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

      <div style={currentPath.startsWith("/expense") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><GiMoneyStack/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/expense" onClick={()=>linkClickEvent("expense")} >
              Expense
            </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

      <div style={currentPath.startsWith("/budget") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><CiMoneyBill/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/budget" onClick={()=>linkClickEvent("budget")} >
              Budget
            </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

      <div style={currentPath.startsWith("/user") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><HiOutlineUser/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/user" onClick={()=>linkClickEvent("user")} >
              User
            </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

      <div style={currentPath.startsWith("/ai") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><VscRobot/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/ai" onClick={()=>linkClickEvent("ai")} >
              AI-insights
            </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

      <div style={currentPath.startsWith("/settings") ? activeLink : nonActiveLink}>
      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><IoSettingsOutline/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/settings" onClick={()=>linkClickEvent("settings")}>
              Settings
            </Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>
      </div>

    </NavBarTemp> :""
  )

};


const navContainerStyle_Logo ={
  display:"flex",
  gap:"9px",
  alignItems:"center",
  flexDirection:"column",
  width:"fit-content"
}

const navContainerStyle ={
  display:"flex",
  gap:"7px",
  width:"100%",
  padding:"10px",
}

const navTextStyle_Logo ={
  color:"white",
  textAlign:"center",
  fontWeight:500,
  fontSize:"12px",
}

const navTextStyle ={
  //color:"white",
  textAlign:"center",
  fontSize:"12px",
}

const imageAttributes ={
  src:"/assets/images/logo.svg",
  height: 80,
  width:60,
  alt:"logo",
}

const navIconStyle ={
  fontSize:"18px",
  //color:"white",
}

export default LeftNavBar;
