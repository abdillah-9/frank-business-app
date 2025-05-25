"use client";

import Image from "@node_modules/next/image";
import LoadingSpinner from "./reusables/UI_components/LoadingSpinner";
import Logo from "./reusables/UI_components/Logo";

const Home = () => {

  return (
    <div style={container}>
      <Logo><Image height={100} width={100} alt=""/></Logo>
    </div>
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
