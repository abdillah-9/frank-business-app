import React from 'react'

export default function Button({children, actionHandler ,buttonStyle={
  fontSize:"14px",textAlign:"center",padding:"7px",backgroundColor:"white",
}}) {
  return (
    <button type='button' onClick={actionHandler} style={buttonStyle}>{children}</button>
  )
}
