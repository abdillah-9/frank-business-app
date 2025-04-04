"use client";
import FormContainer from '@app/UI components/Form/FormContainer'
import Logo from '@app/UI components/Logo';
import React from 'react'
import Image from 'next/image';
import { useLogin } from '../hooks/useLogin';
import toast from '@node_modules/react-hot-toast/dist';
import { PiWarningOctagonLight } from '@node_modules/react-icons/pi';

export default function LoginModelForm() {

    const {login, signInLoading, status:authStatus} = useLogin(); //import login mutation

    //Define formSubmit
    const formSubmit=(data,e)=>{
      e.preventDefault(); 
        console.log("Submitted data from form "+JSON.stringify({...data}));
        const {email, password} = data;
        if(!email || !password) return
        console.log("Email and pword"+email+" "+password)
        login({...data});         
    }
    //Define onError
    const onError=(errors)=>{
        console.log(errors);
        toast.error(
            errors?.email?.message? errors.email.message :
            errors?.password?.message? errors.password.message :""
        )
            
    }

  return (

    <FormContainer formContainer={formContainer} formSubmit={formSubmit} onError={onError}>

      <div style={warning}>
        <div><PiWarningOctagonLight style={warningIcon}/></div>
        <div>
          This system is under development.<br/> 
          Please use "demo@gmail.com" with password "1234567" to login...
        </div>
 
      </div>
      <Logo>
        <Image style={logoStyle} src="../assets/images/logo.svg" alt="logo" width={50} height={50}/>
      </Logo>
        <FormContainer.Header formHeader={formHeader}>
            Log in to your account
        </FormContainer.Header>
        
        <FormContainer.Body formBody={formBody}>
            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Email address</FormContainer.Label>
                <FormContainer.Text fieldName='email'  type={"email"} validation={validateMail}
                inputStyle={inputStyle} />
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label>Password</FormContainer.Label>
                <FormContainer.Text fieldName='password'  type={"password"} validation={validatePword}
                inputStyle={inputStyle} />
            </FormContainer.Row>

            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Submit submitButton={submitButton}>
                    Login
                </FormContainer.Submit>
            </FormContainer.SubmitRow>
        </FormContainer.Body>
    </FormContainer>
  )
}

// ********************* COMPONENTS CSS STYLING ****************************//
let padding = "5px 15px";

const formContainer ={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    gap:"20px",
    position:"fixed",
    top:0,
    left:0,
    width:"100vw",
    height:"100vh",
    backgroundColor:"rgb(245,245,245)"
}
const formBody ={
    backgroundColor: "white",
    fontSize: "14px",
    borderRadius: "5px",
    width:"fit-content",
    minWidth:"250px",
    padding:"7px 20px",
    boxShadow:" 5px 5px 30px rgba(2, 10, 56, 0.92)",
    display:"flex",
    flexDirection:"column",
}
const formHeader={
    fontWeight:"600",
    fontSize:"20px",
}
const formRow={
    display: "flex",
    flexDirection: "column",
    padding: "15px 5px",
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
    width: "230px",
  }
  const labelStyle={
    width: "100px",
    padding: "2px 0px",
    color: "rgb(10, 10, 24)",
  }

const submitButton={
    backgroundColor:"rgb(14, 165, 233)",
    color:"white",
    padding: "5px",
    borderRadius: "5px",
    width: "230px",
    
}
const warning ={
  boxShadow:"2px 3px 15px rgb(30,30,30)",
  fontSize:"13px",
  padding:"5px",
  display:"flex",
  flexDirection:"row",
  gap:"10px",
  maxWidth:"270px",
}

const warningIcon={
  color:"rgb(247, 3, 3)",
  fontSize:"18px",
}

const validateMail = (values)=>{
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
  
    // // Regular expression to allow only letters, numbers, spaces, and underscores
    // const nameRegex = /^[A-Za-z0-9_ ]+$/;
  
    // // Check if the value matches the allowed pattern
    // if (!nameRegex.test(values)) {
    //   return "site name can only contain letters, numbers, spaces, and underscores";
    // }
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

    // // Check if the value is empty or contains only spaces
    // if (values.length() < 8) {
    //   return "password must be atleast 8 char length";
    // }

    return true
  }

const logoStyle={
  width:"50px",
  height:"50px",
}