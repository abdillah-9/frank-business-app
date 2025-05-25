"use client";

import LoadingSpinner from "./reusables/UI_components/LoadingSpinner";

const Home = () => {

  return (
    <div style={container}><LoadingSpinner/></div>
  )
}

//Css
const container = {
  width:'100vw',
  height:"100vh",
  display:"flex",
  alignitems:"center",
  justifyContent:"center",
  position:"fixed",
  top:0,
  left:0,
  zIndex:3,
} 
export default Home
