"use client"
import Button from '@app/reusables/UI_components/Button'
import Icon from '@app/reusables/UI_components/Icon'
import { MdCheckCircle, MdOutlineSignalWifiConnectedNoInternet4, MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from 'react-icons/md';
import React, { useState } from 'react'
import { TiWarningOutline } from '@node_modules/react-icons/ti';
import {TbRobotOff} from "react-icons/tb"
import Details from './details';
import { PiEmptyDuotone } from '@node_modules/react-icons/pi';

export default function Insights({data, stats}) {
    const [insights, setInsights] = useState(data);
    const [details, setDetails] = useState(data);
    const [show, setShow] = useState();

    function dismissAction(budgetID){
        setInsights((currentState)=>currentState.filter((row)=>row.budgetID !== budgetID));
        console.log(insights)
    }

    function showDetails(budgetID){
        setShow(!show)
        setDetails(()=> stats.filter((row)=>row.budgetID == budgetID))
    }

  return (
    <div style={main}>
        {
            show ? <Details show={show} setShow={setShow} details={details}/> : ""
        }
        <div style={header}>AI Insights</div>
            <div style={cardsBody}>
        {
            insights && insights.length > 0 ? insights.map((row)=>
                <div style={cards} key={row.budgetID} >
                    <Icon iconStyle={iconStyle} className={"insightIcons"}>
                        {row.over_budget 
                        ? <TiWarningOutline color="rgb(241, 62, 8)" />
                        : <MdCheckCircle color="green" />
                        }
                    </Icon>
                        <div style={desc}>
                            <div>
                                <span style={budget_name}>{row.budgetName} {"->"} </span>
                                <span 
                                    style={row.over_budget?{...title, ...over_budget} : title}>
                                    {row.tip_title}
                                </span>
                            </div>
                            <div style={paragraph}> {row.tip_desc} </div>
                            <div style={buttons}>
                                <Button actionHandler={()=>showDetails(row.budgetID)} 
                                buttonStyle={{...buttonStyle, 
                                    backgroundColor:"rgba(79, 8, 161, 0.76)",
                                    color:"white",
                                    border:"none",
                                }}> View details 
                                </Button>
                                <Button buttonStyle={buttonStyle} 
                                actionHandler={()=>dismissAction(row.budgetID)}>
                                    Dismiss
                                </Button>
                            </div>
                        </div>
                </div>
            )
                :  <div style={{display:"flex", gap:"10px", alignItems:"center",
                 justifyContent:"center",width:"100%",height:"100%"}}>
                    <span>No insight to show</span> 
                    <Icon iconStyle={iconStyle}><PiEmptyDuotone/></Icon>
                   </div>
            }
        </div>
    </div>
  )
}

//CSS
const main ={
    borderRadius:"5px",
    backgroundColor:"rgba(79, 8, 161, 0.08)",
    padding:"20px",
    display:"flex",
    flexDirection:"column",
    gap:"15px",
    height:"83vh",
    overflow:"auto",
}
const header={
    fontWeight:500,
    fontSize:"17px",
}
const cardsBody={
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    fontSize:"14px",
    gap:"20px",
}
const cards={
    borderRadius:"5px",
    boxShadow:"2px 2px 20px rgb(10,10,10)",
    backgroundColor:"white",
    display:"flex",
    gap:"20px",
    padding:"20px",
    width:"47%",
    minWidth:"230px",
}
const iconStyle={
    fontSize:"25px",
    color:"rgba(79, 8, 161, 0.76)",
    padding:"2px 0px"
}
const chat={
    display:"flex",
    flexDirection:"column",
    gap:"10px",   
}
const desc={
    display:"flex",
    flexDirection:"column",
    gap:"10px",
}
const budget_name={
    fontWeight:500,
    fontSize:"15px",
}
const title={
    fontWeight:500,
    fontSize:"16px",
    color:"rgb(0, 100, 0)",
}
const over_budget ={
    color:"rgb(231, 6, 6)",
}
const paragraph={
    fontSize:"14px",
}
const buttons={
    display:"flex",
    gap:"20px",
}
const buttonStyle={
    padding:"10px",
    color:"rgba(27, 3, 54, 0.8)",
    fontWeight:400,
    border:"1px solid rgba(79, 8, 161, 0.76)",
    borderRadius:"5px",
}