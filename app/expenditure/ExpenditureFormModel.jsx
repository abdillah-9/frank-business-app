"use client"
import FormContainer from "@app/UI components/Form/FormContainer";
import { HiXCircle } from "@node_modules/react-icons/hi";
import { setOverlay } from "../UI components/Overlay/reduxSlice/overlayReducer";
import { useDispatch, useSelector } from "@node_modules/react-redux/dist/react-redux";
import { useInsertFormData } from "./expenditure hooks/useInsertFormData";
import { useUpdateFormData } from "./expenditure hooks/useUpdateFormData";
import toast from "@node_modules/react-hot-toast";
import { useForm } from "@node_modules/react-hook-form";

const FormModel = ()=>{
    //Fetch form data of specific row stored in redux
    let fetchedFormData = useSelector((store)=> store.overlay.fetchedFormData);

    //input fields of the expenditure form fields
    let id=""; let taskSite=""; let date=""; let cost=""; let description="";

    fetchedFormData? {id,taskSite,description,date,cost} = fetchedFormData:""
    
    const dispatch = useDispatch();

    //Here formSubmit and onError are defined
    const { formState:{errors} } = useForm();
    
        const {insertDataMutation} = useInsertFormData();
        const {updateDataMutation} = useUpdateFormData();
    
        // React Hook Config
        const formSubmit = (data)=>{
          fetchedFormData? updateDataMutation({...data}) :
          insertDataMutation({...data});
          dispatch(setOverlay({overlay: false}));
          }
    
        //On errors in input fields
          function onError(errors){
            toast.error(
              errors?.taskSite?.message? errors.taskSite.message :
              errors?.cost?.message?  errors.cost.message :
              errors?.date?.message?  errors.date.message :
              errors?.description?.message?  errors.description.message : ""
            )
          }
        // End 

    return(
        <div style={container} onClick={()=>dispatch(setOverlay({overlay:false}))}>
        <FormContainer fetchedFormData={fetchedFormData? fetchedFormData:false} formContainer={formContainer}
          formSubmit={formSubmit} onError={onError}>
            
            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Icon iconStyle={iconStyle}>
                    <HiXCircle/>
                </FormContainer.Icon>
            </FormContainer.SubmitRow>
            <FormContainer.Number fieldName={"id"}  number={id} inputStyle={idStyle}/>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}> site name </FormContainer.Label>
                <FormContainer.Text inputStyle={inputStyle} fieldName={"taskSite"}  text={taskSite}  
                validation={validateName}/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
                <FormContainer.Label labelStyle={labelStyle}> cost </FormContainer.Label>
                <FormContainer.Number inputStyle={inputStyle} fieldName={"cost"} number={cost} 
                validation={validateCost}/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
            <FormContainer.Label labelStyle={labelStyle}> date </FormContainer.Label>
              <FormContainer.Date inputStyle={inputStyle} fieldName={"date"}  date={date}  
                validation={validateDate}/>
            </FormContainer.Row>

            <FormContainer.Row formRow={formRow}>
              <FormContainer.Label labelStyle={labelStyle}>description</FormContainer.Label>
              <FormContainer.TextArea textAreaStyle={textAreaStyle} fieldName={"description"}
                validation={validateDescription} textArea={description}> 
              </FormContainer.TextArea>
            </FormContainer.Row>

            <FormContainer.SubmitRow submitRow={submitRow}>
                <FormContainer.Cancel cancelStyle={cancelStyle}>Cancel</FormContainer.Cancel>
                <FormContainer.Submit submitButton={submitButton}>
                    {fetchedFormData? "Update expenditure" : "Create new expenditure" }
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
  const validateCost = (values)=>{
      // Check if the value is empty or contains only spaces
      if (!values || values.trim() === "") {
        return "cost is required";
      }
    
      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "cost cannot contain consecutive spaces";
      }
    
      // Regular expression to allow only letters, numbers, spaces, and underscores
      const nameRegex = /^[0-9]+$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "cost can only contain letters, numbers, spaces, and underscores";
      }
      return true; // Return true if validation passes
  }

  const validateDate = (values)=>{
      const dateValue = new Date(values);
      
      // Check if the date is valid
      if (isNaN(dateValue)) {
        return "Please enter a valid date";
      }
    
      return true;
    }
    
  const validateName = (values)=>{
      // Check if the value is empty or contains only spaces
      if (!values || values.trim() === "") {
        return "site name is required";
      }
    
      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "site name cannot contain consecutive spaces";
      }
    
      // Regular expression to allow only letters, numbers, spaces, and underscores
      const nameRegex = /^[A-Za-z0-9_ ]+$/;
    
      // Check if the value matches the allowed pattern
      if (!nameRegex.test(values)) {
        return "site name can only contain letters, numbers, spaces, and underscores";
      }
      return true; // Return true if validation passes
    }
    
  const validateDescription = (values)=>{
      // Check if the value is empty
      if (!values || values.trim() === "") {
        return "Description is required";
      }

      // Regular expression to check for consecutive spaces
      const consecutiveSpacesRegex = /\s{2,}/;
    
      // Check if the value contains consecutive spaces
      if (consecutiveSpacesRegex.test(values)) {
        return "Description cannot contain consecutive spaces";
      }
    
      // Check if the description is too short or too long (optional)
      if (values.length < 10) {
        return "Description must be at least 10 characters long";
      }
    
      if (values.length > 500) {
        return "Description must be no longer than 500 characters";
      }
    
      return true; // Return true if validation passes
    }
    
  
export default FormModel;