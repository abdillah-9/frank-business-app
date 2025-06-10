"use client"
import TableContainer, { TBody,THead,TH,TR,TD } from '@app/reusables/UI_components/Table/TableContainer'
import Image from '@node_modules/next/image';
import React from 'react'
import Icon from '@app/reusables/UI_components/Icon';
import { RiCameraOffLine } from '@node_modules/react-icons/ri';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { HiOutlinePencil, HiOutlineTrash } from '@node_modules/react-icons/hi2';
import { setReduxState } from '@app/provider/redux/reducer';
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';
import toast from '@node_modules/react-hot-toast/dist';
import { IoWarning } from '@node_modules/react-icons/io5';

export default function Table(
  {
    expense, 
    user, 
    budget, 
    pageRows,
    pageNumber, 
    expenseTotalByBudgetId, 
    selectedDate,
    setSelectedDate,
  }) {

  //CSS
  const unConfirmed = {
    backgroundColor:"rgba(204, 7, 7, 0.37)",
    color:"rgb(68, 1, 1)",
  }
  const confirmed = {
    backgroundColor:"rgba(3, 196, 67, 0.37)",
    color:"rgb(6, 43, 1)",
  }
  const exceeded={
    color:"rgba(160, 3, 3, 0.86)",
    fontWeight:500,
    display:"flex",
    gap:"5px",
    alignItems:"center",
  }
  const warningIcon={
    fontSize:"23px",
    cursor:"pointer",
  }

  if (!user){
    return <LoadingSpinner/>
  }

  console.log("This is expenseTotalByBudgetId "+JSON.stringify(expenseTotalByBudgetId))

  const dispatch = useDispatch();
    function deleteAction(rowID){
      dispatch(setReduxState({deleteData:true,overlay:true, showNavBar: false, fetchedFormData: rowID}))
    }

    function editAction(expenseRow){
      dispatch(setReduxState({showForm: true, overlay: true ,fetchedFormData: expenseRow}))
      console.log("fetchedFormData after clicking edit icon "+JSON.stringify(expenseRow))
    }
    function exceededPrompt(){
      toast.error("expenses have exceeded this budget");
    }
  
  return (
        <TableContainer styleTable={tableContainer}>
          <THead>
            <TR styleTR={{...tRow,...headerRow}}>
              <TH styleTH={tCell}>PHOTO</TH>
              <TH styleTH={tCell}>NAME</TH>
              <TH styleTH={tCell}>BUDGET</TH>
              <TH styleTH={tCell}>DESCRIPTION</TH>
              <TH styleTH={tCell}>AMOUNT</TH>
              <TH styleTH={tCell}>STATUS</TH>
              <TH styleTH={tCell}>DATE</TH>
              <TH styleTH={tCell}>ACTIONS</TH>
            </TR>
          </THead>
           <TBody>
            {
              console.log("page number is "+pageRows)
            }
            {  
              expense ? expense.filter(exp => exp.userID === user.id)
              .slice((pageNumber - 1) * pageRows, pageNumber * pageRows)
              .map(expenseRow=>
                <TR key={expenseRow.id} styleTR={tRow}>
                  <TD styleTD={tCell}>
                    {
                      expenseRow.photo.includes("http") ? 
                      <img src={expenseRow.photo}             
                      width={50} height={40} alt={"photo"}/>
                      : <Icon iconStyle={iconStyle}><RiCameraOffLine/></Icon>
                    }
                  </TD>
                  <TD styleTD={tCell}>{expenseRow.name}</TD>
                  <TD styleTD={tCell}>
                    {
                      budget ? 
                        budget.filter((budg) => budg.id === expenseRow.budgetID)
                        .map((budgetRow) => {
                          const matched = expenseTotalByBudgetId
                          .find(e => e.budgetID === budgetRow.id && e.date == selectedDate);
                          const totalExpense = matched ? matched.totalExpense : 0;

                          //calculate day budget amount
                          let daylyBudget = Math.floor(budgetRow.amount / 
                            ((new Date(budgetRow.endDate).getTime())/(1000 * 60 * 60 * 24) - 
                            (new Date(budgetRow.startDate).getTime())/(1000 * 60 * 60 * 24) ));
                            console.log("dayly budget "+daylyBudget);

                          console.log("expense total by id in specific date "+expenseTotalByBudgetId);  
                          console.log("Total exp "+totalExpense+" and daily budget"+daylyBudget);
                          const isExceeded = totalExpense >= daylyBudget;
                          
                          return (
                            <div key={budgetRow.id} style={isExceeded ? exceeded : {}}>
                              <span>{budgetRow.name}</span>
                              <Icon
                                iconStyle={isExceeded ? warningIcon : { display: "none" }}
                                className={"warningAnime"}
                                clickAction={exceededPrompt}
                              >
                                <IoWarning />
                              </Icon>
                            </div>
                          );
                        })
                      : ""
                    }

                  </TD>
                  <TD styleTD={tCell}>{expenseRow.description}</TD>
                  <TD styleTD={tCell}>{expenseRow.amount+"TSh"}</TD>
                  <TD styleTD={tCell}>
                    <div style={expenseRow.status == "confirmed" ?
                      {...status, ...confirmed} : {...status, ...unConfirmed}}>{expenseRow.status}</div>
                  </TD>
                  <TD styleTD={tCell}>{expenseRow.date}</TD>
                  <TD styleTD={tCellActions}>
                    <Icon clickAction={()=>editAction(expenseRow)} title={"edit"}>
                      <HiOutlinePencil/>
                    </Icon>
                    <Icon clickAction={()=>deleteAction(expenseRow.id)} title={"delete"}>
                      <HiOutlineTrash/>
                    </Icon>
                  </TD>
                </TR>
            ) : <TR><TD styleTD={dataNotFound}><LoadingSpinner/></TD></TR>
            }
            
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
const dataNotFound={
  display:"flex",
  alignItems:"center",
}

