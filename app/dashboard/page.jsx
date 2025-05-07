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
              {/* <DashboardFilter 
                setStatsDuration={setStatsDuration} 
                statsDuration={statsDuration}
              /> */}
    <ManagerDashbord user={user}/>
    </>
  );
};

export default Page;
