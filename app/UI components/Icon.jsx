"use client";
import React from 'react';
import toast from '@node_modules/react-hot-toast/dist';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';
import { setOverlay } from './Overlay/reduxSlice/overlayReducer';

const Icon = ({children, padding="10px"}) => {

  const iconStyle ={
    cursor: "pointer",
    padding: padding,
  }

  let dispatch = useDispatch();
  function handleDismiss(){
    dispatch(setOverlay({overlay: false})); //Remove overlay
    toast.dismiss(); //Remove the toast
  }

  return (
      <main style={iconStyle} onClick={handleDismiss}>
      {children}
      </main>
  );
};


export default Icon;
