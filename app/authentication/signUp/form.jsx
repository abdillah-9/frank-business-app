"use client";
import FormContainer from '@app/reusables/UI_components/Form/FormContainer';
import Logo from '@app/reusables/UI_components/Logo';
import React from 'react'
import Image from 'next/image';
import toast from '@node_modules/react-hot-toast/dist';
import {IoImageOutline} from "react-icons/io5";
import Icon from '@app/reusables/UI_components/Icon';
import useSignUp from '../hooks/useSignUp';
import { useRouter } from '@node_modules/next/navigation';

export default function Form() {
  //input fields of the user form fields
  let fullName=""; let email=""; let password="";
  let avatar="";

  const {signUpMutation: createUser, signUpIsLoading} = useSignUp();
  const routing = useRouter(); 

      // React Hook Config
      const formSubmit = (data)=>{
        console.log(JSON.stringify("avatar is "+ Object.entries(data)));
        console.log("avatar is "+data.avatar.name)
        createUser({
          ...data,
        });
        
        //Redirect to signIn
        routing.push("/authentication/signIn");         
        }
  
      //On errors in input fields
        function onError(errors){
          toast.error(
            errors?.fullName?.message? errors.fullName.message :
            errors?.email?.message?  errors.email.message :
            errors?.password?.message?  errors.password.message :
            errors?.avatar?.message?  errors.avatar.message :""
          )
        }
      // End 
  return (

    <FormContainer formSubmit={formSubmit} onError={onError} formContainer={formContainer}>   
    <div style={mainContainer}> 
      <div style={headerCard}>
        <Logo>
            <Image src="/assets/images/logo.svg" alt="logo" width={80} height={80}/>
        </Logo>
        <FormContainer.Header formHeader={formHeader}>
            Create new account
        </FormContainer.Header>
      </div> 
        <FormContainer.Body formBody={formBody}>
            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Full name</FormContainer.Label>
                <FormContainer.Text fieldName='fullName'  type={"text"} validation={validateFullname}
                text={fullName} inputStyle={inputStyle} />
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Password</FormContainer.Label>
                <FormContainer.Text fieldName='password'  type={"password"} validation={validatePword}
                text={password} inputStyle={inputStyle} />
            </FormContainer.Row>


            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Email address</FormContainer.Label>
                <FormContainer.Text fieldName='email'  type={"email"} validation={validateEmail}
                text={email} inputStyle={inputStyle} />
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.File fStyles={[fileStyle, fileStyleSpan]} fileName={"avatar"} 
                  images={avatar} validation={validateFile}>
                  <Icon iconStyle={{fontSize:"20px"}}><IoImageOutline/></Icon>
            </FormContainer.File>
            </FormContainer.Row>

            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Submit submitButton={submitButton}>
                    SignUp
                </FormContainer.Submit>
            </FormContainer.SubmitRow>
        </FormContainer.Body>
    </div>
    </FormContainer>
  )
}

// ********************* COMPONENTS CSS STYLING ****************************//
let padding = "5px 15px";

const formContainer ={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    position:"fixed",
    top:0,
    left:0,
    width:"100vw",
    height:"100vh",
    backgroundColor:"rgb(245,245,245)",
    zIndex:3,
}
const mainContainer={
    boxShadow:" 5px 5px 30px rgba(2, 10, 56, 0.92)",
    backgroundColor:"white",
    display:"flex",
    flexWrap:"wrap",
    justifyContent:"center",
    width:"50vw",
    minWidth:"230px",
    maxWidth:"600px",
}
const formBody ={
    backgroundColor: "white",
    fontSize: "14px",
    width:"25vw",
    minWidth:"230px",
    maxWidth:"300px",
    padding:"7px 20px",
    display:"flex",
    flexDirection:"column",
}

const headerCard={
    backgroundColor: "white",
    width:"25vw",
    minWidth:"230px",
    maxWidth:"300px",
    padding:"7px 20px",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:"20px",
}
const formHeader={
    fontWeight:"600",
    fontSize:"16px",
    textAlign:"center",
    color:"rgba(41, 1, 87, 0.76)",
}
const formRow={
    display: "flex",
    flexDirection: "column",
    padding: "10px 5px",
  }
  const submitRow={
    display: "flex",
    flexDirection: "column",
    padding: "5px", 
  }
  const inputStyle={
    border:"1.5px solid rgba(220,220,240,0.9)",
    padding: "2px",
    borderRadius: "5px",
    width: "100%",
    minWidth:"200px",
    maxWidth:"230px",
  }
  const labelStyle={
    width: "100px",
    padding: "2px 0px",
    color: "rgb(10, 10, 24)",
  }
const submitButton={
    backgroundColor:"rgba(79, 8, 161, 0.76)",
    color:"white",
    padding: "5px",
    borderRadius: "5px",
    width: "100%",
    minWidth:"200px",
    maxWidth:"230px",  
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

const validateFullname = (values)=>{
      // Check if the value is empty or contains only spaces
      if (!values || values.trim() === "") {
        return "name is required";
      }
    
      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "name cannot contain consecutive spaces";
      }
    
      // Regular expression to allow only letters, numbers, spaces, and underscores
      const nameRegex = /^[A-Za-z0-9_ ]+$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "name can only contain letters, numbers, spaces, and underscores";
      }
      return true; // Return true if validation passes
    }

    const validateEmail = (values)=>{
      // Check if the value is empty or contains only spaces
      if (!values || values.trim() === "") {
        return "email is required";
      }
    
      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "email cannot contain consecutive spaces";
      }
    
      // Regular expression to allow only letters, numbers, spaces, and underscores
      const nameRegex = /^[A-Za-z0-9_@.]+$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "email can only contain letters, numbers and underscores";
      }
      return true; // Return true if validation passes
    }

  const validatePword = (values)=>{
    // Check if the value is empty or contains only spaces
    if (!values || values.trim() === "") {
      return "password is required";
    }
  
    // Regular expression to check for consecutive spaces
    const consecutiveSpacesRegex = /\s{2,}/;
  
    // Check if the value contains consecutive spaces
    if (consecutiveSpacesRegex.test(values)) {
      return "password cannot contain consecutive spaces";
    }

    // Check if the value is empty or contains only spaces
    if (values.length < 8) {
      return "password must be atleast 8 char length";
    }

    return true
  }

  function validateFile(values){

  }