"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import Icon from '@app/reusables/UI_components/Icon';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'

export default function Table({user, budget, pageNumber, pageRows}) {
  const dispatch = useDispatch();

  let id = "";let rowID="";

  if (!user) {
  return <LoadingSpinner />;
  }
  if(user){
    id = user.id || "";
  }
  
  function deleteAction(rowID){
    dispatch(setReduxState({deleteData:true,overlay:true, showNavBar: false, fetchedFormData: rowID}))
  }
  function editAction(budgetRow){
    dispatch(setReduxState({showForm: true, overlay: true ,fetchedFormData: budgetRow}))
    console.log("fetchedFormData after clicking edit icon "+JSON.stringify(budgetRow))
  }

//CSS 
const expired = {
  backgroundColor:"rgba(204, 7, 7, 0.37)",
  color:"rgb(68, 1, 1)",
}
const active = {
  backgroundColor:"rgba(3, 196, 67, 0.37)",
  color:"rgb(6, 43, 1)",
}
const upcoming = {
  backgroundColor:"rgba(4, 171, 201, 0.37)",
  color:"rgb(1, 37, 43)",
}

  return (
        <TableContainer styleTable={tableContainer}>
          <THead>
            <TR styleTR={{...tRow, ...headerRow}}>
              <TH styleTH={tCell}>NAME</TH>
              <TH styleTH={tCell}>AMOUNT</TH>
              <TH styleTH={tCell}>STATUS</TH>
              <TH styleTH={tCell}>CATEGORY</TH>
              <TH styleTH={tCell}>DESCRIPTION</TH>
              <TH styleTH={tCell}>START DATE</TH>
              <TH styleTH={tCell}>END DATE</TH>
              <TH styleTH={tCell}>ACTIONS</TH>
            </TR>
          </THead>
           <TBody>
            {
              budget ? budget
              .slice((pageNumber - 1) * pageRows, pageNumber * pageRows)
              .map(budgetRow=>
                <TR key={budgetRow.id} styleTR={tRow}>
                  <TD styleTD={tCell}>{budgetRow.name}</TD>
                  <TD styleTD={tCell}>{budgetRow.amount+"TSh"}</TD>
                  <TD styleTD={tCell}>
                    <div style={
                      budgetRow.status == "active" ? {...status , ...active} : 
                      (budgetRow.status == "expired" ? {...status , ...expired} : {...status , ...upcoming})
                      }
                      >{budgetRow.status}</div>
                  </TD>
                  <TD>{budgetRow.category}</TD>
                  <TD>{budgetRow.description}</TD>
                  <TD styleTD={tCell}>{budgetRow.startDate}</TD>
                  <TD styleTD={tCell}>{budgetRow.endDate}</TD>
                  <TD styleTD={tCellActions}>
                    <Icon clickAction={()=>editAction(budgetRow)} title={"edit"}>
                      <HiOutlinePencil/>
                    </Icon>
                    <Icon clickAction={()=>deleteAction(budgetRow.id)} title={"delete"}>
                      <HiOutlineTrash/>
                    </Icon>
                  </TD>
                </TR>
              ) : <TR><TH styleTH={dataNotFound}><LoadingSpinner/></TH></TR>}
            
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
const dataNotFound={
  display:"flex",
  justifyContent:"center",
}

