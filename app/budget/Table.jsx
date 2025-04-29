"use client"
import useUser from '@app/authentication/hooks/useUser';
import Icon from '@app/reusables/UI_components/Icon';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { getBudgetData } from '@utils/apiBudget';
import React from 'react'

export default function Table() {
  //Now lets use the React Query to fetch data from supabase
  const {isLoading, data: budget, error} =  useQuery({
    queryKey: ['budgetData'],
    queryFn: getBudgetData
  });

  const {user} = useUser();
  let id = "";

  if (!user) {
  return <LoadingSpinner />;
  }
  if(user){
    id = user.id || "";
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
              budget ? budget.filter(exp => exp.userID === user.id).map(budgetRow=>
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
                    <Icon><HiOutlinePencil/></Icon>
                    <Icon><HiOutlineTrash/></Icon>
                  </TD>
                </TR>
              ) : <TR><TH>No data found</TH></TR>}
            
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

