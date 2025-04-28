"use client"
import useLogOut from '@app/authentication/hooks/useLogOut';
import { BsBoxArrowRight } from '@node_modules/react-icons/bs';
import { HiArrowRightOnRectangle } from '@node_modules/react-icons/hi2';
import React from 'react'
import LoadingSpinner from '../../LoadingSpinner';

export default function LogoutComponent() {
    const {logOut, logOutIsLoading} = useLogOut();

  return (
    <button style={logoutButton} onClick={logOut}>
        {
        logOutIsLoading ? <LoadingSpinner/> :
         //<BsBoxArrowRight />
         <HiArrowRightOnRectangle/> 
      }
    </button>
  )
}

const logoutButton ={
   fontSize:"20px",
   display:"flex",
   alignItems:"center"
}