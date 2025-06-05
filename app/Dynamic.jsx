"use client"
import React, { useEffect } from 'react'

export default function DynamicPage({children}) {

  //Css
  const dynamicPage={
    width:"100%",
    height:"90vh",
    padding:"15px 10px",
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch('https://frank-business-ai.onrender.com/wakeUP', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        console.error('Connection Err ', error);
      }
    };

    fetchData();    
  }
  ,[])

  return (
    <div style={dynamicPage}>
      {children}      
    </div>
  )
}