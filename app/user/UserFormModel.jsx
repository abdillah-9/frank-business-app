"use client"
import FormContainer from "@app/UI components/Form/FormContainer";
import { HiXCircle } from "@node_modules/react-icons/hi";
import { setOverlay } from "../UI components/Overlay/reduxSlice/overlayReducer";
import { useDispatch, useSelector } from "@node_modules/react-redux/dist/react-redux";
import toast from "@node_modules/react-hot-toast";
import { useForm } from "@node_modules/react-hook-form";
import useSignUp from "@app/authentication/hooks/useSignUp";
import useUpdateUser from "./user hooks/useUpdateUser";

const FormModel = ()=>{
  
    //Fetch form data of specific row stored in redux
    let fetchedFormData = useSelector((store)=> store.overlay.fetchedFormData);

    //input fields of the user form fields
    let id=""; let fullName=""; let email=""; let password="";
    let confirmPassword=""; let avatar="";

    if(fetchedFormData){
      id = fetchedFormData.id;
      email = fetchedFormData.email;
      confirmPassword = password= "";
      avatar =  fetchedFormData.user_metadata.avatar;
      fullName = fetchedFormData.user_metadata.fullName;
    }

    fetchedFormData? console.log("user is "+Object.entries(fullName)) : console.log("create user");
    
    const dispatch = useDispatch();

    //Here formSubmit and onError are defined
    const { formState:{errors} } = useForm();

    const {signUpMutation: createUser, signUpIsLoading} = useSignUp(); 
    const {updateUser} = useUpdateUser();
    
        // React Hook Config
        const formSubmit = (data)=>{
          if(data.password != data.confirmPassword ){ 
          toast.error("password and confirm password should match" );
          return 
        }
          console.log(JSON.stringify("data.avatar is "+ Object.entries(data)));

          !fetchedFormData ? createUser({...data, avatar: data.avatar[0]}) : 
          updateUser({...data, avatar: data.avatar[0]})

          dispatch(setOverlay({overlay: false}));
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

    //SPECIAL CSS property
    const inputStyle={
      border:"1.5px solid rgba(220,220,240,0.9)",
      padding: "2px",
      borderRadius: "5px",
      width: "230px",
      placeholder: "xxx xxx xxx",
    }

    return(
        <div style={container} onClick={()=>dispatch(setOverlay({overlay:false}))}>
        <FormContainer fetchedFormData={fetchedFormData? fetchedFormData:false} formContainer={formContainer}
          formSubmit={formSubmit} onError={onError}>
            
            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Icon iconStyle={iconStyle}>
                    <HiXCircle/>
                </FormContainer.Icon>
            </FormContainer.SubmitRow>
            <FormContainer.Text fieldName="id" text={id} inputStyle={idStyle}/>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}> full name </FormContainer.Label>
                <FormContainer.Text inputStyle={inputStyle} fieldName={"fullName"}  text={fullName}  
                validation={validateName}/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
              <FormContainer.Label labelStyle={labelStyle}>email</FormContainer.Label>
              <FormContainer.Text inputStyle={inputStyle} fieldName={"email"}  text={email}  
                validation={validateEmail} type="email"/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
              <FormContainer.Label labelStyle={labelStyle}> password</FormContainer.Label>
              <FormContainer.Text inputStyle={inputStyle} fieldName={"password"} 
               text={password} validation={!fetchedFormData?validatePassword:validatePasswordUpdateMode}
                type="password" placeholder="xxx xxx xxx xxx" />
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
              <FormContainer.Label labelStyle={labelStyle}>confirm password </FormContainer.Label>
              <FormContainer.Text inputStyle={inputStyle} fieldName={"confirmPassword"} 
               text={confirmPassword} type="password" 
               placeholder="xxx xxx xxx xxx"/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}>Photo </FormContainer.Label>
                <FormContainer.File fStyles={[fileStyle, fileStyleSpan]} fileName={"avatar"} 
                images={avatar} validation={validateFile}>
                    Choose file
                </FormContainer.File>
            </FormContainer.Row>            

            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
                <FormContainer.Submit submitButton={submitButton}>
                    {fetchedFormData? "Update user" : "Create new user"}
                </FormContainer.Submit>
            </FormContainer.SubmitRow>

        </FormContainer>
        </div>
    )

}

const container = {
    position: "fixed",
    top:0,
    left:0,
    width:"100vw",
    height:"100vh",
     backdropFilter: "blur(3px)",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
}

// ********************* COMPONENTS CSS STYLING ****************************//
let padding = "5px 10px";
const formContainer ={
    backgroundColor: "white",
    fontSize: "14px",
    borderRadius: "5px",
    width:"50%",
    maxWidth:"1000px",
    minWidth:"270px",
    padding:" 0px 5px 5px 5px",
    boxShadow:" 5px 5px 30px rgba(2, 10, 56, 0.92)",
}
const formRow={
    display: "flex",
    justifyContent:"flex-start",
    gap:"10px",
    alignItems: "center",
    flexDirection: "row",
    padding: "5px 7px", 
    borderBottom: "1px solid rgba(220,220,240,0.5)",
  }
  const submitRow={
    display: "flex",
    justifyContent: "flex-end",
    gap:"16px",
    flexDirection: "row",
    padding: "20px 10px", 
  }
  const inputStyle={
    border:"1.5px solid rgba(220,220,240,0.9)",
    padding: "2px",
    borderRadius: "5px",
    width: "230px",
  }
  const labelStyle={
    display:"flex",
    justifySelf:"center",
    alignSelf:"center",
    width:"30%",
    minWidth: "70px",
    padding: "2px 0px",
    color: "rgb(10, 10, 24)",
  }

  const fileStyle = {
    display: "flex",
    flexDirection:"row",
    flexWrap:"wrap",
    alignItems:"center",
    gap:"10px",
    width:"230px",
    cursor:"pointer",
  }
  const fileStyleSpan = {
    backgroundColor:"rgb(14, 165, 233)",
    borderRadius:"5px",
    padding,
    color: "white",
  }
const submitButton={
    backgroundColor:"rgb(14, 165, 233)",
    borderRadius:"5px",
    padding,
    color: "white",
}
const cancelStyle={
    backgroundColor:"white",
    color: "black", 
    border:"1px solid rgba(220,220,220,1)", 
    borderRadius:"5px",
    padding,
}
const iconStyle ={
    fontSize:"30px",
    color: "rgb(245, 5, 5)",
}
const idStyle ={
    display:"none",
}
const optionStyle ={
  color:"rgba(120,120,120,1)",
}
const textAreaStyle ={
  width: "230px",
  height:"70px", 
  border:"1.5px solid rgba(220,220,240,0.9)",
  padding: "2px",
  borderRadius: "5px",
}
const scrollableContainerStyle={
  border:"1.5px solid rgba(220,220,240,0.9)",
  padding: "2px",
  borderRadius: "5px",
  width: "230px",
  height: "70px",
  overflow: "auto",
}

const checkBoxStyle={
  border:"1.5px solid rgba(220,220,240,0.9)",
  borderRadius: "50%",
  width: "20px",
  height:"20px",
}

// ******************* Available INPUTS VALIDATION methods **************** //

  const validateName = (values)=>{
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

    const validatePassword = (values)=>{
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
    
      // Regular expression to allow only letters, numbers and underscores
      const nameRegex = /^[A-Za-z0-9_]+$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "password can only contain letters, numbers and underscores";
      }
      return true; // Return true if validation passes
    }
    const validatePasswordUpdateMode = (values)=>{
      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "password cannot contain consecutive spaces";
      }
    
      // Regular expression to allow only letters, numbers and underscores
      const nameRegex = /^[A-Za-z0-9_]*$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "password can only contain letters, numbers and underscores";
      }
      return true; // Return true if validation passes
    }
        
    const validateConfirmPassword = (values)=>{
      // Check if the value is empty or contains only spaces
      if (!values) {
        return "confirm password and password should match";
      }

      return true; // Return true if validation passes
    }

    const validateFile = (values)=>{
      // // Check if the value is empty or contains only spaces
      // if (!values) {
      //   return "user photo is required";
      // }
      return true;
  }    
export default FormModel;