"use client"
import { setReduxState } from '@app/provider/redux/reducer';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import FormContainer from '@app/reusables/UI_components/Form/FormContainer'
import { HiXCircle } from '@node_modules/react-icons/hi2';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'
import toast from '@node_modules/react-hot-toast';
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';

export default function Form({insertDataMutation, updateDataMutation, user, settingsData}) {
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const newData = useSelector((store)=>store.ReduxState.fetchedFormData);
  const dispatch = useDispatch();
  const {windowSize} = useWindowSize();
  const {} = useQuery

  let id=""; let userID = "";
  let amount=""; let name=""; let category=""; let status=""; let description=""; let startDate=""; let endDate="";

  if(!user || !formState){
    return 
  }

  if(newData){
    ({id,name, amount, status, category, description, startDate, endDate} = newData);
  }
  userID = user.id;

  function handleShowForm(){
    dispatch(setReduxState({overlay: false, showForm: false}));
  }

  function formSubmit(data){
    user? console.log("submitted data is "+ JSON.stringify(data)) :""
    newData.id ? 
    updateDataMutation({...data})
    :
    insertDataMutation({...data})
    dispatch(setReduxState({showForm: false, overlay:false}));
  }

  function onError(errors){
    toast.error(
      errors?.name?.message? errors.name.message :
      errors?.amount?.message?  errors.amount.message :
      errors?.status?.message?  errors.status.message :
      errors?.category?.message?  errors.category.message :
      errors?.description?.message?  errors.description.message :
      errors?.startDate?.message?  errors.startDate.message :
      errors?.endDate?.message?  errors.endDate.message :""
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
  console.log(settingsData)

  return (
    <FormContainer formContainer={form} handleClose={handleShowForm} formSubmit={formSubmit} onError={onError}>
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Icon iconStyle={cancelIcon} >
          <HiXCircle/>
        </FormContainer.Icon>
      </FormContainer.SubmitRow>
      <FormContainer.Number number={id} inputStyle={idStyle} fieldName={"id"}/>
      <FormContainer.Text text={userID} inputStyle={idStyle} fieldName={"userID"}/>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> name </FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName={"name"}  text={name}  
          validation={validateName}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> amount </FormContainer.Label>
        <FormContainer.Number inputStyle={inputStyle} fieldName={"amount"} number={amount} 
          validation={validateAmount}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>status</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName={"status"} > 
          <FormContainer.Option optionValue={"active"}>active</FormContainer.Option>
          <FormContainer.Option optionValue={"expired"}>expired</FormContainer.Option>
          <FormContainer.Option optionValue={"upcoming"}>upcoming</FormContainer.Option>
        </FormContainer.Select>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}>category</FormContainer.Label>
        <FormContainer.Select inputStyle={inputStyle} fieldName={"category"} >
          {
            settingsData? settingsData.map((row, index)=>
              <FormContainer.Option optionValue={settingsData.budget_categories} key={index}>
                {row.budget_categories}
              </FormContainer.Option>
            ):"you have no categories please create them in settings menu ..."
          } 
        </FormContainer.Select>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> start-date </FormContainer.Label>
        <FormContainer.Date inputStyle={inputStyle} fieldName={"startDate"}  date={startDate}  
          validation={validateStartDate}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> end-date </FormContainer.Label>
        <FormContainer.Date inputStyle={inputStyle} fieldName={"endDate"}  date={endDate}  
          validation={validateEndDate}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={{...formRow, width:"100%",height:"100px"}}>
        <FormContainer.Label labelStyle={labelStyle}> description </FormContainer.Label>
        <FormContainer.TextArea textAreaStyle={textArea} fieldName={"description"} validation={validateDesc}
        textArea={description}/>
      </FormContainer.Row>

      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
        <FormContainer.Submit submitButton={submitButton}>
          {newData.id ? "Update budget" : "Create budget" }
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
const validateName = (values)=>{
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

function validateStartDate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "start-date is required";
  }

}

function validateEndDate(values){
   // Check if the value is empty or contains only spaces
   if (!values || values.trim() === "") {
    return "end-date is required";
  }

}