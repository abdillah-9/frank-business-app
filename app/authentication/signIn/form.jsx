"use client";
import FormContainer from '@app/reusables/UI_components/Form/FormContainer';
import Logo from '@app/reusables/UI_components/Logo';
import React from 'react'
import Image from 'next/image';
import { useLogin } from '../hooks/useLogin';
import toast from '@node_modules/react-hot-toast/dist';
import Link from '@node_modules/next/link';

export default function Form() {
    let email=""; let password = "";

    const {login, signInLoading, status:authStatus} = useLogin(); //import login mutation

    //Define formSubmit
    const formSubmit=(data)=>{
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
    <div style={mainContainer}> 
      <div style={headerCard}>
        <Logo>
            <Image src="/assets/images/logo.svg" alt="logo" width={80} height={80}/>
        </Logo>
        <FormContainer.Header formHeader={formHeader}>
            Log in to your account
        </FormContainer.Header>
      </div> 
        <FormContainer.Body formBody={formBody}>
            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Email address</FormContainer.Label>
                <FormContainer.Text fieldName='email'  type={"email"} validation={validateMail}
                inputStyle={inputStyle} text={email} />
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label>Password</FormContainer.Label>
                <FormContainer.Text fieldName='password'  type={"password"} validation={validatePword}
                inputStyle={inputStyle} text={password} />
            </FormContainer.Row>

            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Submit submitButton={submitButton}>
                    SignIn
                </FormContainer.Submit>
            </FormContainer.SubmitRow>
            <div style={signUpContainer}>
                <div>Dont have an account?</div> 
                <Link href={"/authentication/signUp"} style={signUpLink}>SignUp here</Link>
            </div>
        </FormContainer.Body>
    </div>
    </FormContainer>
  )
}

// ********************* COMPONENTS CSS STYLING ****************************//
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
const signUpContainer={
    fontSize:"13px",
    display:"flex",
    flexWrap:"wrap",
    gap:"10px",
    padding:"10px 0px",
}
const signUpLink={
    color:"rgba(41, 1, 87, 0.76)",
    fontWeight:500,
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