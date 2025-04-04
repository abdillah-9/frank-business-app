"use client";
import React from 'react';

const Button = ({
  backgroundColor,
  color,
  padding="7px",
  borderRadius="0px",
  boxShadow,
  width="fit-content",
  actionHandler,
  margin,
  gap="0px",
  children
}) => {

/* We define Css Here */
const buttonStyle = {
  color: color,
  backgroundColor: backgroundColor,
  boxShadow: boxShadow,
  display: "flex",
  padding:padding,
  border:"1px solid rgba(200,200,230,0.8)",
  borderRadius: borderRadius,
  alignItems:"center",
  justifyContent:"center",
  gap:gap,
  height:"fit-content",
  width: width,
  cursor: "pointer",
  margin:margin
}

  return (
      <div type="button" style={buttonStyle} onClick={()=>actionHandler()}> {children} </div>
  );
};


export default Button;
