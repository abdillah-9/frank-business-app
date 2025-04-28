import React from 'react'

export default function Icon({children, clickAction, iconStyle={fontSize:"16px"}}) {

  return (
    <i style={iconStyle} onClick={clickAction}>
      {children}
    </i>
  )
}
