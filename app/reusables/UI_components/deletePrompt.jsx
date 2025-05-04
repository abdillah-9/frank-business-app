"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'
import Button from './Button';

export default function DeletePrompt({mutateDeleting}) {

    const dispatch = useDispatch();
    const showDeletePrompt = useSelector((store)=>store.ReduxState.deleteData);
    const rowID = useSelector((store)=>store.ReduxState.fetchedFormData);

    function removeOverlay(){
        dispatch(setReduxState({overlay:false,showNavBar:false,deleteData:false}))
    }

    function Yes(){
        //Delete data logic
        mutateDeleting(rowID);
    }

    //CSS  
    const deleteOverlay={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        position:"fixed",
        top: showDeletePrompt ? 0 : "-100vh",
        transition: "top 0.2s ease",
        left:0,
        padding:"10px",
        zIndex:2,
        width:"100vw",
        height:"100vh",
        backdropFilter: "blur(3px)",
    }

  return (
    <div style={deleteOverlay} onClick={removeOverlay}>
        <div style={main} onClick={(e)=>e.stopPropagation()}>
            <div style={paragraph}>
                <div style={head}>You are about to delete this row,</div>
                <span style={span}>this action can't be undone</span> 
            </div>
            <div style={buttons}>
                <Button buttonStyle={confirmed} actionHandler={Yes}>YES</Button>
                <Button buttonStyle={denied} actionHandler={removeOverlay}>NO</Button>
            </div>
        </div>
    </div>
  )
}

//CSS
const main={
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    backgroundColor:"white",
    padding:"20px 10px",
    fontSize:"14.5px",
    position:'relative',
    width:"50%",
    maxWidth:"300px",
    minWidth:"220px",
    boxShadow:"1px 2px 25px rgb(10,10,10)"
}
const paragraph={
    textAlign:"center",
    display:"flex",
    flexDirection:"column",
    gap:"10px",
}
const head={
    fontWeight:"500px",
    fontSize:"17px",
}
const span={
    color:"rgba(131, 18, 3, 0.94)"
}
const buttons={
    display:"flex",
    justifyContent:"space-between",
    gap:"20px",
    fontSize:"14px",
    fontWeight:700,
}
const confirmed={
    backgroundColor:"rgba(248, 35, 6, 0.33)",
    color:"rgb(82, 13, 4)",
    padding:"5px 10px",
    borderRadius:"5px",
}
const denied={
    backgroundColor:"rgba(17, 167, 45, 0.4)",
    color:"rgb(77, 11, 2)",
    padding:"5px 10px",
    borderRadius:"5px",
}