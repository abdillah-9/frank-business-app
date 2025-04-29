"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import Image from '@node_modules/next/image';
import {MdOutlineNoPhotography} from "react-icons/md"
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import { RiCameraOffLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';

export default function Table({expense, budget, user}) {
  //CSS
  const unConfirmed = {
    backgroundColor:"rgba(204, 7, 7, 0.37)",
    color:"rgb(68, 1, 1)",
  }
  const confirmed = {
    backgroundColor:"rgba(3, 196, 67, 0.37)",
    color:"rgb(6, 43, 1)",
  }

  let photo=""
  if (!user){
    return <LoadingSpinner/>
  }

  return (
        <TableContainer styleTable={tableContainer}>
          <THead>
            <TR styleTR={{...tRow,...headerRow}}>
              <TH styleTH={tCell}>PHOTO</TH>
              <TH styleTH={tCell}>NAME</TH>
              <TH styleTH={tCell}>DESCRIPTION</TH>
              <TH styleTH={tCell}>AMOUNT</TH>
              <TH styleTH={tCell}>STATUS</TH>
              <TH styleTH={tCell}>DATE</TH>
              <TH styleTH={tCell}>ACTIONS</TH>
            </TR>
          </THead>
           <TBody>
            {
              expense ? expense.filter(exp => exp.userID === user.id).map(expenseRow=>
                <TR key={expenseRow.id} styleTR={tRow}>
                  <TD styleTD={tCell}>
                    {
                      photo = expenseRow.photo
                    }
                    {
                      photo ? 
                      <Image src={expenseRow.photo}             
                      width={50} height={40} alt={"photo"}/>
                      : <Icon iconStyle={iconStyle}><RiCameraOffLine/></Icon>
                    }

                  </TD>
                  <TD styleTD={tCell}>{expenseRow.name}</TD>
                  <TD styleTD={tCell}>{expenseRow.description}</TD>
                  <TD styleTD={tCell}>{expenseRow.amount+"TSh"}</TD>
                  <TD styleTD={tCell}>
                    <div style={expenseRow.status == "confirmed" ?
                      {...status, ...confirmed} : {...status, ...unConfirmed}}>{expenseRow.status}</div>
                  </TD>
                  <TD styleTD={tCell}>{expenseRow.date}</TD>
                  <TD styleTD={tCellActions}>
                    <Icon><HiOutlinePencil/></Icon>
                    <Icon><HiOutlineTrash/></Icon>
                  </TD>
                </TR>
            ) : <TR><TD>Data not found</TD></TR>}
            
           </TBody>
        </TableContainer>
  )
}

//Css
const tableContainer={
  fontSize:"14px",
  width:"100%",
  border:"0.5px solid rgb(200,200,200)",
}
const tRow={
  backgroundColor:"white",
  borderRadius:"15px"
}
const headerRow={
  backgroundColor:"rgb(235,235,235)",
  fontSize:"12px",
}
const tCell={
  padding:"10px",
  width:"20%",
  minWidth:"100px",
  textAlign:"left",
}
const tCellActions={
  display:"flex",
  gap:"10px",
  justifyContent:"flex-start",
  padding:"20px 10px",
  width:"20%",
  minWidth:"100px",
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

