"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import FormContainer from '@app/reusables/UI_components/Form/FormContainer'
import { HiXCircle } from '@node_modules/react-icons/hi2';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'
import toast from '@node_modules/react-hot-toast/dist';
import { BiBorderBottom } from '@node_modules/react-icons/bi';

export default function Form({budget, insertDataMutation, updateDataMutation, user}) {
  let id;let userID;let amount; let budget_categories; let budgetID;

  const {windowSize} = useWindowSize()
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const newData = useSelector((store)=>store.ReduxState.fetchedFormData); 
  const dispatch = useDispatch();

  function handleShowForm(){
    dispatch(setReduxState({overlay: false, showForm: false}));
  }

  if(!user || !formState){
    return
  }  

  if(newData){
    ({id,amount,budget_categories,budgetID} = newData)
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
      errors?.budget_categories?.message? errors.budget_categories.message :""
    )
  }

  const form={
    fontSize:"14px",
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"flex-start", alignItems:"flex-start",
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
    boxShadow:"2px 2px 20px black"
  }

  const formRow={
    width: windowSize.windowWidth >= 768 ? "100%" : "100%",
    height:"60px",
    padding:"10px 0px",
    borderBottom:"1px solid rgba(79, 8, 161, 0.16)",
    display:"flex",
    gap:"10px",
    alignItems:"flex-start",
  }


  console.log("budget "+budget)
  return (
    <FormContainer formContainer={form} handleClose={handleShowForm} 
    formSubmit={formSubmit} onError={onError}>
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Icon iconStyle={cancelIcon} >
          <HiXCircle/>
        </FormContainer.Icon>
              <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> New category </FormContainer.Label>

        <FormContainer.Text inputStyle={inputStyle} fieldName={"budget_categories"} 
          text={budget_categories}  
          validation={validatebudget_categories}/>
        </FormContainer.Row>

        <FormContainer.SubmitRow submitRow={{
            display:"flex", flexWrap:"wrap", gap:"20px",justifyContent:"flex-end",
            }}>
            <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
            <FormContainer.Submit submitButton={submitButton}>
                {newData? "Update settings" : "Add new settings" }
            </FormContainer.Submit>
      </FormContainer.SubmitRow>

      </FormContainer.SubmitRow>

      <FormContainer.Text text={id} inputStyle={idStyle} fieldName={"id"}/>
      <FormContainer.Text text={userID} inputStyle={idStyle} fieldName={"userID"}/>

      {/* <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
        <FormContainer.Submit submitButton={submitButton}>
          {newData? "Update settings" : "Add new settings" }
        </FormContainer.Submit>
        
      </FormContainer.SubmitRow> */}

    </FormContainer>
  )
}

//CSS
const cancelIcon={
  fontSize:"30px",
  color: "rgb(245, 5, 5)",
  display:"flex",
  justifyContent:"flex-end"
}
const idStyle={
  display: "none",
}
const labelStyle={
  width:"140px",
  
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
  border:"1px solid rgba(95, 17, 185, 0.48)",
  borderRadius:"5px",
  width:"100%",
  height:"fit-content",
  justifyContent: "flex-start",
  gap:"20px",
  flexDirection: "column",
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
const validatebudget_categories = (values)=>{
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
    return "budget budget_categories is required";
  }

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (consecutiveSpacesRegex.test(values)) {
    return "budget budget_categories cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const budget_categoriesRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if (!budget_categoriesRegex.test(values)) {
    return "budget budget_categories can only contain letters, numbers, spaces, and underscores";
  }

  //check length
  if(values.length > 15){
    return "budget budget_categories must not exceed 15 characters"
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
  const budget_categoriesRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if ( values && !budget_categoriesRegex.test(values)) {
    return "description can only contain letters, numbers, spaces, and underscores";
  }
    //check length
    if(values.length > 50){
      return "budget desc must not exceed 15 characters"
    }
  return true; // Return true if validation passes
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

function validatedate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "start-date is required";
  }

}

function validateBudget(values){
  // Check if the value is empty or contains only spaces
  if (!values || values.trim() === "") {
   return "budget budget_categories is required";
 }

}

function validateFile(){

}