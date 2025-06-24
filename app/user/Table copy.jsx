"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import Image from '@node_modules/next/image';
import useUser from '@app/authentication/hooks/useUser'
import React, { useEffect } from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import { RiCameraOffLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';

export default function Table() {
  let id="";let email="";let avatar="";let fullName="";
  
  const {user} = useUser();
  user ? {id, email, user_metadata:{avatar, fullName}} = user :""

  return (
        <TableContainer styleTable={tableContainer}>
           <TBody>
           { 
           user ? 
           <>
                <TR styleTR={tRow}>
                  <TH styleTH={{...tCell, ...headerCell}}>AVATAR</TH>
                  <TD styleTD={tCell}>
                    {
                      avatar ? 
                      <img src={avatar} width={150} height={150} alt={"photo"} style={picStyle}/>
                      : <Icon iconStyle={iconStyle}><RiCameraOffLine/></Icon>
                    }
                  </TD>
                </TR>
                <TR styleTR={tRow}>
                  <TH styleTH={{...tCell, ...headerCell}}>NAME</TH>
                  <TD styleTD={tCell}>
                    <div>FULL NAME</div><div>{fullName}</div>
                  </TD>
                </TR>  

                <TR styleTR={tRow}>
                  <TH styleTH={{...tCell, ...headerCell}}>E-MAIL</TH>
                  <TD styleTD={tCell}>
                    <div>E-MAIL</div><div>{email}</div>
                  </TD>
                </TR>  
                </>
                :
                <>
                <TR styleTR={tRow}>
                  <TH styleTH={{...tCell, ...headerCell}}><LoadingSpinner/></TH>
                </TR>
                </>
                } 
           </TBody>     
        </TableContainer>
  )
}

//Css
const picStyle={
  borderRadius:"50%",
  outline:"2px solid rgb(199, 199, 199)",
  outlineOffset:"7px",
}
const tableContainer={
  fontSize:"14px",
  width:"100%",
  border:"0.5px solid rgb(200,200,200)",
}
const tRow={
  backgroundColor:"white",
  borderRadius:"15px",
}
const headerCell={
  backgroundColor:"rgb(235,235,235)",
  border:"0.5px solid rgb(200,200,200)",
  fontSize:"12px",
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
  fontSize:"25px",
  color:"rgba(53, 44, 65, 0.67)",
}

