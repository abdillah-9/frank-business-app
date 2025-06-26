import Icon from '@app/reusables/UI_components/Icon'
import { HiXMark } from '@node_modules/react-icons/hi2'
import {FaCircleXmark} from "react-icons/fa6"
import React, { useState } from 'react'

export default function Details({show, setShow, details}) {

    console.log("details "+JSON.stringify(details))

    function eventHandler(show){
        setShow(!show)
    }
  return (
    <>
    <div style={overlay} onClick={eventHandler}></div>
    <div style={main}>
        <div style={whiteCard}>
            <Icon iconStyle={iconStyle} clickAction={eventHandler}><FaCircleXmark/></Icon>
            {
                details.map((row)=>
                <div key={row.budgetID}>
                <div style={Total} >
                    <div>Budget name: {row.budgetName.toLocaleString()}</div>
                    <div>Budget amount: {row.budgetAmount.toLocaleString()}Tsh</div>
                    <div>Total Expenses: {row.expenseTotal.toLocaleString()}Tsh</div>
                </div>

                <div style={allExpenses}>
                    <div style={{fontWeight:500}}>All transactions</div>
                    {row.allExpenses.map((miniRow, index)=>
                        <div key={index}>
                            <span>{++index}.</span> 
                            <span style={{padding:"0px 5px"}}>{miniRow.name}</span> 
                            <span>{" -> "}{miniRow.amount.toLocaleString()}Tsh</span>
                            <span style={{padding:"0px 15px"}}>
                                {new Date(miniRow.date).toLocaleDateString("en-US",{
                                    year:"numeric",
                                    month:"short",
                                    day:"2-digit"
                                })}
                            </span>
                        </div>
                    )}
                </div>

                {/* <div style={allExpenses}>
                    {row.allExpenses.map((miniRow)=><>
                    <span>{console.log("Before "+index)}</span>
                        <div key={++index}>
                        {console.log("After "+index)}
                            <div>{index} {miniRow.name} {miniRow.amount}</div>
                        </div>
                    </>)}
                </div> */}
                </div>
                )
            }
        </div>
    </div>
    </>
  )
}

//css
const overlay={
    backdropFilter: "blur(3px)",
    zIndex:2,
    position:"fixed",
    top:0,
    left:0,
    width:"100vw",
    height:"100vh",
    cursor:"pointer",
}
const main ={
    position:"fixed",
    top:0,
    right:0,
    width:"60vw",
    minWidth:"200px",
    height:"100vh",
    display:"flex",
    zIndex:3,
    backgroundColor:"white",
    boxShadow:"2px 1px 10px rgb(10,10,10)"
}
const whiteCard={
    display:"flex",
    flexDirection:"column",
    padding:"20px",
    gap:"7px",
    height:"100vh",
    width:"100%",
    fontSize:"15px"
}
const iconStyle={
    color:"red",
    padding:"0px 5px 15px 0px",
    fontSize:"25px",
    cursor:"pointer",
}
const Total={
    borderBottom:"1px solid rgb(100,100,100)",
    padding:"0px 0px 5px 5px",
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
    gap:"15px",
}
const allExpenses={
    display:"flex",
    flexDirection:"column",
    flexWrap:"wrap",
    gap:"10px",
    overflow:"auto",
    color: '#555',
    padding:"10px 0px 0px 5px",
}

