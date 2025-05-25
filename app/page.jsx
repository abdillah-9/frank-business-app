"use client";

import LoadingSpinner from "./reusables/UI_components/LoadingSpinner";

const Home = () => {

  return (
    <div style={container}><LoadingSpinner/></div>
  )
}

//Css
const container = {
  width:'100%',
  height:"90vh",
  display:"flex",
  justifySelf:"flex-end",
} 
export default Home
