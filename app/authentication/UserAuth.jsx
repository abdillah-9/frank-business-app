"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';

export default function UserAuth() {
  const [isClient, setIsClient] = useState(false);  // To check if it's in client-side
  const routing = useRouter();
  
  // Only run this code on the client side after the component mounts
  useEffect(() => {
    setIsClient(true);  // Set to true when the component is mounted on the client-side
  }, []);

  // Only access window when we're on the client
  const currentUserUrl = isClient ? window.location.pathname : ""; // Avoid 'window' on SSR

  // Here we'll complete authentication and authorization
  const { isLoading: userLoading, user: userData, isAuthenticated } = useUser();

  // Redirect user to Login page if there is no authenticated user token in local storage
  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      routing.push("/authentication/signIn");
    }
  }, [isAuthenticated, userLoading, routing]);

  // Redirect authenticated user to dashboard if they are on restricted page
  useEffect(() => {
    if (isAuthenticated && !userLoading && 
      (currentUserUrl === "/" || currentUserUrl === "" || currentUserUrl.includes("/authentication"))) {
      routing.push("/dashboard");
    }
  }, [isAuthenticated, currentUserUrl, userLoading, routing]);

  // Show loading spinner while user data is loading
  if (userLoading) return <div style={spinnerFullScreen}><LoadingSpinner/></div>

  return (<></>);
}
const spinnerFullScreen={
  width:"100vw",
  height:"100vh",
  display:"flex",
  position:"fixed",
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"white",
  zIndex:3,
}
