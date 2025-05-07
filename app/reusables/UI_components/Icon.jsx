import React from 'react'

export default function Icon({
  children, clickAction, iconStyle={fontSize:"16px",cursor:"pointer"}, title, className
}) {

  return (
    <i style={iconStyle} onClick={clickAction} title={title} className={className}>
      {children}
    </i>
  )
}
