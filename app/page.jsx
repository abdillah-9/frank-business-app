"use client";
import {Provider} from "react-redux";
import store from "@app/provider/Store";
import LoginModelForm from "./authentication/login/LoginModelForm";
import useUser from "./authentication/hooks/useUser";
import LoadingSpinner from "./UI components/LoadingSpinner";
import { useRouter } from "@node_modules/next/navigation";
import { useEffect, useState } from "react";
import ManagerDashbord from "./dashboard/ManagerDashbord";
import UserAuth from "./authentication/UserAuth";

const Home = () => {
  // const [isClient, setIsClient] = useState(false);  // To check if it's client-side
  // const routing = useRouter();

  // // Only access window when we're on the client
  // const currentUserUrl = isClient ? window.location.pathname : ""; // Avoid 'window' on SSR

  // console.log(currentUserUrl);

  // // Here we'll complete authentication and authorization
  // const { isLoading: userLoading, user: userData, isAuthenticated } = useUser();  

  // //Step 01
  //   // Redirect user to Login page if there is no authenticated user token in local storage
  //   useEffect(() => {
  //     if (!isAuthenticated && !userLoading) { 
  //     // routing.push("/authentication/login");
  //     }
  //   }, [isAuthenticated, userLoading, routing]);  

  // //Step 02
  //   // Redirect authenticated user to dashboard if they are on restricted page
  //   useEffect(() => {
  //     if (isAuthenticated && !userLoading && 
  //       (currentUserUrl === "/" || currentUserUrl === "" || currentUserUrl.includes("/authentication"))) {
  //       routing.push("/dashboard");
  //     }
  //   }, [isAuthenticated, currentUserUrl, userLoading, routing]);

  // //Step 03 
  //   // Show loading spinner while user data is loading
  //   if (userLoading) return <LoadingSpinner />;     

  return (
    <Provider store={store}>
    <section className="w-12/12 flex flex-col h-5/6 mb-2vh overflow-y-auto">
    </section>
    </Provider>
  )
}
export default Home
