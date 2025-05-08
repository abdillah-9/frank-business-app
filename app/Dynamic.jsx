import React from 'react'

export default function DynamicPage({children}) {

//Css
const dynamicPage={
  width:"100%",
  height:"90vh",
  padding:"15px 30px",
}

  return (
    <div style={dynamicPage}>
      {children}      
    </div>
  )
}