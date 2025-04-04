"use client";
import React from 'react';

const Card = ({width,padding,boxShadow, justifyContent, children}) => {

/* We define Css Here */
const containerStyle = {
  width: width,
  height: "fit-content",
  borderRadius: "5px",
  padding: padding,
  display:"flex",
  boxShadow: boxShadow,
  justifyContent: justifyContent,
  overflow: "hidden",
}

  return (
    <>
      <div style={containerStyle}> {children} </div>
    </>
  );
};


export default Card;
