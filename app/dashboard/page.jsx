"use client"
import useUser from "@app/authentication/hooks/useUser";
import ManagerDashbord from "./ManagerDashbord";
import LoadingSpinner from "@app/reusables/UI_components/LoadingSpinner";
import DashboardFilter from "./DashboardFilter";
import { useState } from "react";

const Page = () => {
    const {user} = useUser();
    const [statsDuration, setStatsDuration] = useState("All");

    if(!user){
      return (
        <LoadingSpinner/>
      )
    }
  return (
    <>
    <div style={headerContainer}>
       <div style={header}>Dashboard</div>
       <DashboardFilter setStatsDuration={setStatsDuration} statsDuration={statsDuration} /> 
    </div>          
    <ManagerDashbord user={user} setStatsDuration={setStatsDuration} statsDuration={statsDuration}/>
    </>
  );
};

export default Page;

//css
const headerContainer={
  display:"flex",
  flexWrap:"wrap",
  gap:"10px",
  justifyContent:"space-between",
  justifySelf:"center",
  width:"100%",
  padding:"13px 0px",
  //border:"1px solid red",
}
const header={
  fontSize:"20px",
  fontWeight:"500",
}
