"use client"
import Image from '@node_modules/next/image';
import useUser from '@app/authentication/hooks/useUser'
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import { RiCameraOffLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import Button from '@app/reusables/UI_components/Button';
import { CiEdit } from '@node_modules/react-icons/ci';

export default function Table({actionHandler}) {
  let id="";let email="";let avatar="";let fullName="";
  
  const {user} = useUser();
  user ? {id, email, user_metadata:{avatar, fullName}} = user :""

  const timeZone = new Date().toString().slice(25);

  return (
    <div style={tableContainer}>
      {
        user ?      
          <>
            <div style={image}>
              {
                avatar ? 
                <img src={avatar} width={150} height={150} alt={"photo"} style={picStyle}/>
                : <Icon iconStyle={iconStyle}><RiCameraOffLine/></Icon>
              }
                <Button buttonStyle={createButton} actionHandler={actionHandler}>
                  <Icon iconStyle={{fontSize:"20px"}}><CiEdit /></Icon>Update User Profile
                </Button>
              
            </div>
            <div style={desc}>
              <div style={heading}>My Profile</div>
              <div style={{width: "250px",display:"flex",flexDirection:"column",gap:"10px"}}>
                <div>FULL NAME</div>
                <div style={{...headerCell, textTransform:"capitalize"}}>{fullName}</div>
              </div>
              <div style={{width: "250px",display:"flex",flexDirection:"column",gap:"10px"}}>
                <div>E-MAIL</div><div style={headerCell}>{email}</div>   
              </div>
              <div style={{width: "250px",display:"flex",flexDirection:"column",gap:"10px"}}>
                <div>TIME ZONE</div><div style={headerCell}>{timeZone}</div>
              </div>
              <div style={{width: "250px",display:"flex",flexDirection:"column",gap:"10px"}}>
                <div>ACCOUNT STATUS</div><div style={headerCell}>Authenticated</div>
              </div>
            </div>
          </> 
      : ""
      }
    </div>
  )
}

//Css
const createButton={
  width:"fit-content",
  backgroundColor:"rgba(79, 8, 161, 0.76)",
  boxShadow:"1px 1px 10px rgb(40, 33, 43)",
  padding:"10px 25px",
  borderRadius:"20px",
  color:"white",
  fontSize:"14px",
  display:"flex",
  gap:"6px",
  justifyContent:"center",
  alignItems:"center",
}
const picStyle={
  borderRadius:"50%",
  outline:"2px solid rgb(199, 199, 199)",
  outlineOffset:"7px",
}
const tableContainer={
  fontSize:"14px",
  width:"100%",
  border:"0.5px solid rgb(200,200,200)",
  padding:"20px 10px 30px 15px",
  display:"flex",
  gap:"50px",
  flexWrap:"wrap",
}
const heading={
  width:"100%",
  fontSize:"20px",
  fontWeight:600,
  padding:"15px 0px 0px 0px",
  color:"rgb(100,100,100)"
}
const image={
  width:"100%",
  paddingTop:"20px",
  maxWidth:"200px",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  gap:"20px",
}
const desc={
  width:"60%",
  minWidth:"200px",
  display:"flex",
  flexWrap:"wrap",
  gap:"20px",
}
const tRow={
  backgroundColor:"white",
  borderRadius:"15px",
}
const headerCell={
  backgroundColor:"rgb(235,235,235)",
  border:"0.5px solid rgb(200,200,200)",
  fontSize:"15px",
  fontWeight:500,
  padding:"5px",
}
const tCell={
  padding:"10px",
  width:"20%",
  minWidth:"100px",
  textAlign:"left",
}
const status={
  padding:"5px 10px",
  borderRadius:"20px",
  fontWeight:500,
  fontSize:"13px",
  width:"fit-content"
}

const iconStyle={
  fontSize:"50px",
  color:"rgba(53, 44, 65, 0.67)",
}

