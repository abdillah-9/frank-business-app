"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import FullScreenLoadingSpinner from '@app/UI components/FullScreenLoadingSpinner';
import { setOverlay } from '@app/UI components/Overlay/reduxSlice/overlayReducer';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';

export default function UserAuth({ children }) {
  const dispatch = useDispatch();
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
      //routing.push("/authentication/login");
      routing.push("/authentication/login");
      dispatch(setOverlay({showSideNavBar:false}));
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
  if (userLoading) return <FullScreenLoadingSpinner/>

  return (
<></>
  );
}
