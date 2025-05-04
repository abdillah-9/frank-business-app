"use client";
import { setReduxState } from '@app/provider/redux/reducer';
import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

const Overlay = () => {

  const overlay = useSelector((store)=> store.ReduxState.overlay);
  const dispatch = useDispatch();

  function handleClick(){
      dispatch(setReduxState({overlay: false, showNavBar: false, showForm: false, deleteData:false}))
  }

  if(overlay == false){
    return <></>
  }

  return createPortal(
      <main style={overlayStyle} onClick={handleClick}></main>,
      document.body
  );
};

//Css 
const overlayStyle ={
  position: "fixed",
  width: "100vw",
  height: "100vh",
  left: 0,
  top: 0,
  backdropFilter: "blur(3px)",
}

export default Overlay;
