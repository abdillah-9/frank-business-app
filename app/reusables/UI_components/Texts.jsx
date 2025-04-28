import React from 'react'

export default function Texts({children, textStyle={fontSize:"14px"}}) {

  return (
    <div style={textStyle}>
      {children}
    </div>
  )
}

