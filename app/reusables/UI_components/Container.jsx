import React from 'react'

export default function Container({children, containerStyle={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"flex-end",
  flexWrap:'wrap',
  gap:"12px"
}}) {
  return (
    <div style={containerStyle}>
      {children}
    </div>
  )
}
