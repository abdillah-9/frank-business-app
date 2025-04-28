"use client"
import useUser from '@app/authentication/hooks/useUser';
import { setReduxState } from '@app/provider/redux/reducer';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import FormContainer from '@app/reusables/UI_components/Form/FormContainer'
import toast from '@node_modules/react-hot-toast/dist';
import { HiXCircle } from '@node_modules/react-icons/hi2';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import React from 'react'
import useUpdateUser from './user hooks/useUpdateUser';
import { useRouter } from '@node_modules/next/navigation';

export default function Form() {
  const redirecting = useRouter();

  const {user} = useUser();
  let id = "";
  let password = "";
  let images = ""
  let email = "";
  let avatar = "";
  let fullName = "";

  if(user){
    id = user.id || "";
    email = user.email || "";
    avatar = user.user_metadata?.avatar || "";
    fullName = user.user_metadata?.fullName || "";
    password = user.password || "";
  }

  user? console.log("user "+id) :""

  const formState = useSelector((store)=>store.ReduxState.showForm);
  const dispatch = useDispatch();
  const {updateUser} = useUpdateUser();

  function handleShowForm(){
    dispatch(setReduxState({overlay: false, showForm: false}));
  }

  function formSubmit(data){
    user? console.log("user data"+ JSON.stringify(data)) :""

    updateUser({    
      id,
      email,
      fullName,
      password, ...data, avatar: avatar? data.avatar[0] :""})
    dispatch(setReduxState({showForm: false, overlay:false}));
  }

  function onError(errors){
    toast.error(
      errors?.fullName?.message? errors.fullName.message :
      errors?.email?.message?  errors.email.message :
      errors?.password?.message?  errors.password.message :
      errors?.avatar?.message?  errors.avatar.message :""
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

  const {windowSize} = useWindowSize()
  const formRow={
    width: windowSize.windowWidth >= 768 ? "50%" : "100%",
    height:"60px",
    padding:"10px 0px",
    borderBottom:"1px solid rgba(79, 8, 161, 0.16)",
    display:"flex",
    gap:"10px",
    alignItems:"center",
  }


  return (
    <FormContainer formContainer={form} handleClose={handleShowForm} formSubmit={formSubmit} onError={onError}>
      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Icon iconStyle={cancelIcon} >
          <HiXCircle/>
        </FormContainer.Icon>
      </FormContainer.SubmitRow>
      <FormContainer.Text fieldName="id" text={id} inputStyle={idStyle}/>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> fullName </FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName={"fullName"}  text={fullName}  
          validation={validatefullName}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> email </FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName={"email"}  text={email}  
          validation={validateEmail}/>
      </FormContainer.Row>

      <FormContainer.Row formRow={formRow}>
        <FormContainer.Label labelStyle={labelStyle}> password </FormContainer.Label>
        <FormContainer.Text inputStyle={inputStyle} fieldName={"password"}  text={password}  
          validation={validatePassword} placeholder='********'/>
      </FormContainer.Row>

      <FormContainer.Row formRow={{...formRow, height:"fit-content"}}>
        <FormContainer.Label labelStyle={labelStyle}>Avatar </FormContainer.Label>
        <FormContainer.File fStyles={[fileStyle, fileStyleSpan]} fileName={"images"} 
          images={images} validation={validateFile}>
            Choose file
        </FormContainer.File>
      </FormContainer.Row>

      <FormContainer.SubmitRow submitRow={submitRow}>
        <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
        <FormContainer.Submit submitButton={submitButton}>
          Update user
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
  padding:"0px 12px",
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
const validatefullName = (values)=>{
  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (values && consecutiveSpacesRegex.test(values)) {
    return "name cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_ ]+$/;

  // Check if the value matches the allowed pattern
  if (values && !nameRegex.test(values)) {
    return "name can only contain letters, numbers, spaces, and underscores";
  }
  return true; // Return true if validation passes
}

const validateEmail = (values)=>{

  // Regular expression to check for consecutive spaces
  const consecutiveSpacesRegex = /\s{2,}/;

  // Check if the value contains consecutive spaces
  if (values && consecutiveSpacesRegex.test(values)) {
    return "email cannot contain consecutive spaces";
  }

  // Regular expression to allow only letters, numbers, spaces, and underscores
  const nameRegex = /^[A-Za-z0-9_@.]+$/;

  // Check if the value matches the allowed pattern
  if (values && !nameRegex.test(values)) {
    return "email can only contain letters, numbers and underscores";
  }
  return true; // Return true if validation passes
}

const validatePassword = (values)=>{
// Regular expression to check for consecutive spaces
const consecutiveSpacesRegex = /\s{2,}/;

// Check if the value contains consecutive spaces
if (values && consecutiveSpacesRegex.test(values)) {
  return "password cannot contain consecutive spaces";
}

// Check if the value is empty or contains only spaces
if (values && values.length < 8) {
  return "password must be atleast 8 char length";
}

return true
}

function validateFile(){

}