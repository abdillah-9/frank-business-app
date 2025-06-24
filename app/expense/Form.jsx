"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import FormContainer from '@app/reusables/UI_components/Form/FormContainer'
import { HiXCircle } from '@node_modules/react-icons/hi2';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React, { useState } from 'react'
import toast from '@node_modules/react-hot-toast/dist';

export default function Form(
  {
    budget, 
    insertDataMutation, 
    updateDataMutation, 
    user, 
    expenseTotalByBudgetId,
    selectedDate,
    setSelectedDate,
  }) {
  let id;let userID;let amount; let name;let description; let date;let photo="";let budgetID;
  const today = new Date().toISOString().slice(0,10);

  const {windowSize} = useWindowSize()
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const newData = useSelector((store)=>store.ReduxState.fetchedFormData); 
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [isDisabled, setDisabled]= useState({disabled:"", notAllowed:""})
  const [selectedBudget, setSelectedBudget] = useState(null);
  const dispatch = useDispatch();

  function handleShowForm(){
    dispatch(setReduxState({overlay: false, showForm: false}));
  }

  if(!user || !formState){
    return
  }  

  if(newData){
    ({id,amount,name,description,date,photo,budgetID} = newData)
  }
  userID = user.id;

  function formSubmit(data){
    user? console.log("userID"+ JSON.stringify(data)) :""
    user? console.log("my photo"+data.photo):""

    newData ?
    updateDataMutation({
      ...data
    })  :
    insertDataMutation({
      ...data
    })
    dispatch(setReduxState({showForm: false, overlay:false}));
  }

  function onError(errors){
    toast.error(
      errors?.name?.message? errors.name.message :
      errors?.amount?.message?  errors.amount.message :
      errors?.status?.message?  errors.status.message :
      errors?.description?.message?  errors.description.message :
      errors?.images?.message? errors.images.message :
      errors?.date?.message?  errors.date.message :""
    )
  }

  const form={
    fontSize:"14px",
    display:"flex",
    flexWrap:"wrap",
    backgroundColor:"white",
    padding:"15px",
    position:"fixed",
    top:0,
    left:formState ? 0 : "-100vw",
    width: "90vw",
    maxWidth:"600px",
    height:"100vh",
    overflow:"auto",
    transition: "left 0.5s ease",
    zIndex:2,
  }

  const formRow={
    width: windowSize.windowWidth >= 768 ? "50%" : "100%",
    height:"60px",
    padding:"10px 0px",
    borderBottom:"1px solid rgba(79, 8, 161, 0.16)",
    display:"flex",
    gap:"10px",
    alignItems:"center",
  }

  function validateAmount(values){
    // Check if the value is empty or contains only spaces
    if (!values || values.trim() === "") {
      return "budget amount is required";
    }

    // Regular expression to check for consecutive spaces
    const consecutiveSpacesRegex = /\s{2,}/;

    // Check if the value contains consecutive spaces
    if (consecutiveSpacesRegex.test(values)) {
      return "budget amount cannot contain consecutive spaces";
    }

    return true; // Return true if validation passes 
  }

  function handleAmount(e) {
    let expenseData, dailyBudget, amountDiff;
    if(!selectedBudget){
      //setEnteredAmount(0);
      toast.error("Please select budget first");
      return
    }
    expenseData = expenseTotalByBudgetId.find((e)=>e.budgetID == selectedBudget && e.date == selectedDate);
    console.log("expenseData "+JSON.stringify(expenseData));

    if (!expenseData){
      expenseData = {totalExpense :0};
    }

    //calculate daily budget for this
    {
      budget ? 
        budget.filter((row)=>user.id == row.userID && row.id == selectedBudget)
        .map((budgetRow) => {

          //calculate day budget amount
          dailyBudget = Math.floor(budgetRow.amount / 
            ((new Date(budgetRow.endDate).getTime())/(1000 * 60 * 60 * 24) - 
            (new Date(budgetRow.startDate).getTime())/(1000 * 60 * 60 * 24) ));
            console.log("dayly budget "+dailyBudget);

          console.log("expense total by id in specific date "+JSON.stringify(expenseTotalByBudgetId));  
          console.log("Total exp "+expenseData.totalExpense+" and daily budget"+dailyBudget);
          amountDiff = dailyBudget - expenseData.totalExpense
        })
      : ""
    }

    console.log("daily budget "+dailyBudget);
    console.log("daily amountDiff "+amountDiff);

    //Now check if amount is not higher that dailyBudgetLimit
    if(amountDiff <= 0 ){
      setDisabled({disabled:"disabled", notAllowed:"not-allowed"});
      toast.error("You've reached ur expense limit");
      return
    }
    if(e.target.value > amountDiff){
      setDisabled({disabled:"disabled", notAllowed:"not-allowed"});
      toast.error("You can't spend more than "+amountDiff+" Tsh");
      return
    }
    setDisabled({disabled:"", notAllowed:""})
  }

  function handleBudget(e) {
    //toast.error("Hellow amount is "+enteredAmount+" and budget id is "+e.target.value)
  }


  console.log("budget "+budget)
  console.log("The selectedDate "+selectedDate)
  console.log("expenseTotalByBudgetId is "+JSON.stringify(expenseTotalByBudgetId))
  return (
    <FormContainer
      formContainer={form} 
      handleClose={handleShowForm} 
      formSubmit={formSubmit} 
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      selectedBudget={selectedBudget}
      setSelectedBudget={setSelectedBudget}
      onError={onError}
      enteredAmount={enteredAmount}
      setEnteredAmount={setEnteredAmount}
    >
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Icon iconStyle={cancelIcon} >
          <HiXCircle/>
        </FormContainer.Icon>
      </FormContainer.SubmitRow>
      <FormContainer.Text text={id} inputStyle={idStyle} fieldName={"id"}/>
      <FormContainer.Text text={userID} inputStyle={idStyle} fieldName={"userID"}/>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> name </FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName={"name"}  text={name}  
          validation={validatename}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>budget name</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName={"budgetID"} 
        selected={budgetID} validation={validateBudget}
        onInput={handleBudget}> 
          <FormContainer.Option optionValue={""}></FormContainer.Option>
            {
              budget ? 
                budget.filter((row)=>user.id == row.userID)
                .map((budgetRow) => {
                  const matchedExpense = expenseTotalByBudgetId
                    .find(e => e.budgetID === budgetRow.id && e.date == selectedDate);
                  const totalExpense = matchedExpense ? matchedExpense.totalExpense : 0;
                  //const isExceeded = totalExpense > budgetRow.amount;

                  //calculate day budget amount
                  let dailyBudget = Math.floor(budgetRow.amount / 
                    ((new Date(budgetRow.endDate).getTime())/(1000 * 60 * 60 * 24) - 
                    (new Date(budgetRow.startDate).getTime())/(1000 * 60 * 60 * 24) ));
                    console.log("dayly budget "+dailyBudget);

                  console.log("expense total by id in specific date "+JSON.stringify(expenseTotalByBudgetId));  
                  console.log("Total exp "+totalExpense+" and daily budget"+dailyBudget);
                  const isExceeded = totalExpense >= dailyBudget;

                  return !isExceeded ? (
                    <FormContainer.Option optionValue={budgetRow.id} key={budgetRow.id}>
                      {budgetRow.name}
                    </FormContainer.Option>
                  ) : null;
                })
              : ""
            }
        </FormContainer.Select>
      </FormContainer.Row>
      
      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> amount </FormContainer.Label>
        <FormContainer.Number 
          inputStyle={inputStyle} 
          fieldName={"amount"} 
          number={amount} 
          validation={validateAmount} 
          onInput={handleAmount}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> date </FormContainer.Label>
        <FormContainer.Date inputStyle={inputStyle} fieldName={"date"}  date={today}  
          validation={validatedate}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>status</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName={"status"}> 
          <FormContainer.Option optionValue={"confirmed"}>confirmed</FormContainer.Option>
          <FormContainer.Option optionValue={"unConfirmed"}>un-confirmed</FormContainer.Option>
        </FormContainer.Select>
      </FormContainer.Row>

      {/* <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>budget name</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName={"budgetID"} 
        selected={budgetID} validation={validateBudget}> 
          <FormContainer.Option optionValue={""}></FormContainer.Option>
        </FormContainer.Select>
      </FormContainer.Row> */}

      <FormContainer.Row formRow={{...formRow, height:"fit-content"}}>
        <FormContainer.Label labelStyle={labelStyle}>Photo </FormContainer.Label>
        <FormContainer.File fStyles={[fileStyle, fileStyleSpan]} fileName={"photo"} 
          images={photo} validation={validateFile}>
            Choose file
        </FormContainer.File>
      </FormContainer.Row>

      <FormContainer.Row formRow={{...formRow, width:"100%",height:"100px"}}>
        <FormContainer.Label labelStyle={labelStyle}> description </FormContainer.Label>
        <FormContainer.TextArea textAreaStyle={textArea} fieldName={"description"} validation={validateDesc}
        textArea={description}/>
      </FormContainer.Row>

      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
        <FormContainer.Submit submitButton={submitButton} disabled={isDisabled}>
          {newData? "Update expense" : "Create expense" }
        </FormContainer.Submit>
        
      </FormContainer.SubmitRow>

    </FormContainer>
  )
}

//CSS
const cancelIcon={
  fontSize:"30px",
  color: "rgb(245, 5, 5)",
}
const idStyle={
  display: "none",
}
const labelStyle={
  width:"70px",
}
const inputStyle={
  width:"150px",
  border:"1px solid rgba(79, 8, 161, 0.16)",
  padding:"5px",
  //boxShadow:"1px 1px 5px rgba(79, 8, 161, 0.76)"
}
const textArea={
  width:"100%",
  height:"80px",
  maxWidth:"250px",
  border:"1px solid rgba(79, 8, 161, 0.16)",
  padding:"5px",
}
const submitRow={
  display: "flex",
  width:"100%",
  justifyContent: "flex-end",
  gap:"20px",
  flexDirection: "row",
  padding: "20px 10px", 
  fontWeight:500,
}
const cancelStyle={
  backgroundColor:"rgb(245, 5, 5)",
  color:"white",
  borderRadius:"5px",
  height:"50px",
  padding:"5px 12px",
}
const submitButton={
  //backgroundColor:"rgba(79, 8, 161, 0.76)",
  boxShadow:"1px 2px 10px rgba(12, 0, 26, 0.76)",
  color:"rgba(18, 2, 36, 0.76)",
  borderRadius:"5px",
  height:"50px",
  padding:"5px 12px",
}
const fileStyle = {
  display: "flex",
  flexDirection:"row",
  flexWrap:"wrap",
  alignItems:"center",
  gap:"10px",
  cursor:"pointer",
}
const fileStyleSpan = {
  backgroundColor:"rgba(79, 8, 161, 0.76)",
  borderRadius:"5px",
  padding:"10px",
  color: "white",
}

//Validation methods
const validatename = (values)=>{
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
    return "budget name is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "budget name cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if (!nameRegex.test(values)) {
    return "budget name can only contain letters, numbers, spaces, and underscores";
  }

  //check length
  if(values.length > 15){
    return "budget name must not exceed 15 characters"
  }
  return true; // Return true if validation passes
}

const validateDesc = (values)=>{
  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (values && consecutiveSpacesRegex.test(values)) {
    return "description cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if ( values && !nameRegex.test(values)) {
    return "description can only contain letters, numbers, spaces, and underscores";
  }
    //check length
    if(values.length > 50){
      return "budget desc must not exceed 15 characters"
    }
  return true; // Return true if validation passes
}

function validatedate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "start-date is required";
  }

}

function validateBudget(values){
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
   return "budget name is required";
 }

}

function validateFile(){

}