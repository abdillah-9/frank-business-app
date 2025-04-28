"use client";
import React from 'react'

export default function Logo({children, logoStyle, actionHandler}) {
  return (
    <div style={logoStyle} onClick={actionHandler}>
        {children}      
    </div>
  )
}
