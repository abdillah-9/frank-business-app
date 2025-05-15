import React from 'react'

export default function Button({children, actionHandler ,buttonStyle=buttonStyleDefault}) {
  return (
    <button type='button' onClick={actionHandler} style={buttonStyle}>{children}</button>
  )
}

//Css
const buttonStyleDefault={
  fontSize:"14px",
  textAlign:"center",
  padding:"7px",
  backgroundColor:"white",
}
