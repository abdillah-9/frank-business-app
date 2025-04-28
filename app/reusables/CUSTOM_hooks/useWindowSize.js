import { useEffect, useState } from "react";

export default function useWindowSize(){

    const [windowSize, setWindowSize] = useState({
        windowWidth:0, windowHeight:0,
    });
    
    useEffect(
        ()=>{
          setWindowSize({windowWidth:window.innerWidth, windowHeight:window.innerHeight});
    
          function handleResize(){
            setWindowSize({windowWidth:window.innerWidth, windowHeight:window.innerHeight});
          }
          
          window.addEventListener("resize",handleResize);
    
          return()=>(
            window.removeEventListener("resize", handleResize)
          )
        },[]);
    
    return {windowSize, setWindowSize}
}