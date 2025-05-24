"use client";
import React from 'react'
import NavBarTemp from '../NavBarTemp'
import { RiLogoutCircleRLine, RiMenuFoldLine, RiMenuUnfoldLine } from '@node_modules/react-icons/ri'
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import { setReduxState } from '@app/provider/redux/reducer';
import useUser from '@app/authentication/hooks/useUser';
import useLogOut from '@app/authentication/hooks/useLogOut';
import toast from '@node_modules/react-hot-toast/dist';

export default function TopNavBar() {

  let id="";let email="";let avatar="";let fullName="";
  
  const {user} = useUser();
  user ? {id, email, user_metadata:{avatar, fullName}} = user :""

  const isVisible =  useSelector((store)=> store.ReduxState.showNavBar)
  const showOverlay =  useSelector((store)=> store.ReduxState.overlay)
  const dispatch = useDispatch()

  //const {isVisible, setIsVisible} = useNavVisibility();
  const {windowSize} = useWindowSize();
    
  const navIconEvent= ()=>{
    dispatch(setReduxState({showNavBar: !isVisible, overlay: !showOverlay})); 
  }

  const imageAttributes={
    src:avatar? avatar : "/assets/images/userProfile.svg",
    width:50,
    height:50,
    alt:"",
  }

  const {logOut} = useLogOut();

  return (
    <div>
      <NavBarTemp navBarTempStyle={navBarTempStyle}>

        <NavBarTemp.NavContainer navContainerStyle={activeUser}>
          <NavBarTemp.NavImage imageAttributes={imageAttributes}/>
          <NavBarTemp.NavText navTextStyle={fullNameStyle}>
            {
                user ? fullName :"active user"
            }
          </NavBarTemp.NavText>
        </NavBarTemp.NavContainer>

        <NavBarTemp.NavContainer navContainerStyle={icons}>
          <NavBarTemp.NavIcon navIconStyle={icons} iconEvent={navIconEvent} >
            {
              (windowSize.windowWidth >= 1024) ? "" : isVisible ? <RiMenuFoldLine/> : <RiMenuUnfoldLine/>
            }
          </NavBarTemp.NavIcon>

          <NavBarTemp.NavIcon navIconStyle={icons} iconEvent={logOut} >
            <RiLogoutCircleRLine/>
          </NavBarTemp.NavIcon>
        </NavBarTemp.NavContainer>

      </NavBarTemp>
    </div>
  )
}

//CSS objects
const navBarTempStyle ={
  display:"flex",
  justifySelf:"flex-end",
  justifyContent:"flex-end",
  alignItems:"center",
  gap:"30px",
  width:"100%",
  height:"10vh",
  padding:"10px 20px",
  //backgroundColor:"rgb(250, 250, 250)",
  backgroundColor:"white",
}
const activeUser={
  display:"flex",
  alignItems:"center",
  gap:"7px",
}

const fullNameStyle={
  fontSize:"15px",
}

const icons={
  display:"flex",
  gap:"15px",
  color:"rgba(79, 8, 161, 0.76)",
  fontSize:"25px",
  cursor:"pointer",
}
