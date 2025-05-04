import React from 'react'

export default function Icon({
  children, clickAction, iconStyle={fontSize:"16px",cursor:"pointer"}, title
}) {

  return (
    <i style={iconStyle} onClick={clickAction} title={title}>
      {children}
    </i>
  )
}
