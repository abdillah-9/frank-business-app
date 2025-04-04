"use client";
import LoadingSpinner from "@app/UI components/LoadingSpinner";
import useFetchSettings from "./settings hooks/useFetchSettings";
import useUpdateSettings from "./settings hooks/useUpdateSettings";
import {VscTools} from "react-icons/vsc";

const formContainer = {
    display:"flex",
    flexDirection: "column",
    gap: "40px",
    backgroundColor:"rgba(230,230,230,1)",
    boxShadow: "5px 3px 3px rgba(20,20,20,0.35)",
    padding: "16px",
    margin:"50px 10",
    width: "fit-content",
}
const formRow ={
    display:"flex",
    width:"fit-content",
    gap: "80px",
}
const inputStyle ={
    backgroundColor:"rgba(200,200,220,0.8)",
}
const labelStyle ={
    display:"block",
   // width:"300px",
}

export default function Settings(){

    //Here we define fetching hook
    const {data, isLoading} = useFetchSettings();
    console.log(isLoading);

    //Here we define update hook 'onBlur'
     const {isLoadingUpdateSetting, updateSettingApi} = useUpdateSettings();

    //define handleUpdate
    function handleUpdate(e, field){
        const {value} = e.target;
        console.log(value);
        console.log(field); 

        if(!value) return;
        updateSettingApi({ [field]: value });
    }

   //If isLoading then display the Spinner
   if(isLoading){
    return  <LoadingSpinner></LoadingSpinner>
  }

    return(
         
        <>
            {/* <header>System Settings</header>
            { data ? <form>
            { data.map(arr=><div key={arr.id}>
                <label style={labelStyle}>Maximum price</label>
                <input type="number" defaultValue={arr.maxPrice} 
                onBlur={e=>{handleUpdate(e, "maxPrice")}}
                />
                </div>) }
            { data.map(arr=><div key={arr.id}>
                <label style={labelStyle}>Maximum price</label>
                <input type="number" defaultValue={arr.minPrice} 
                onBlur={e=>{handleUpdate(e, "minPrice")}}
                />
                </div>) }    
            { data.map(arr=><div key={arr.id}>
                <label style={labelStyle}>Maximum price</label>
                <input type="number" defaultValue={arr.minOrderingDays} 
                onBlur={e=>{handleUpdate(e, "minOrderingDays")}}
                />
                </div>) }
            </form>
             : "No data" } */}

             <div style={centered}>
                <div>Sorry this part is under development...</div>
                <VscTools style={icon}/>
            </div>
             
        </>
    )

}

//Css
const centered = {
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    alignItems:"center",
    justifyContent:"center",
    width:"100%",
    height:"100%",
    fontSize:"16px",
}
const icon={
    fontSize:"25px",
}