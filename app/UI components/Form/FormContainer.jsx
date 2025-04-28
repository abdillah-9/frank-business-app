"use client"
import { useDispatch} from "@node_modules/react-redux/dist/react-redux";
import { createContext, useContext, useState} from "react";
import { setReduxState } from "@app/provider/redux/reducer";
import { useForm } from "@node_modules/react-hook-form";

//Step .1 create context API
const FormContext = createContext();

//Step .2 define the parent component with states if are needed
const FormContainer = ({children,formContainer,formSubmit,onError, handleClose})=>{

    // Lets dispatch redux that controls overlay
    let dispatch = useDispatch();
    
    // Import conf of react hook form
    const {register, handleSubmit, setValue} = useForm();

    formSubmit; // On correct form submition
    onError; // If errors occur in input fields

    // The end

    return(
        <FormContext value={{handleClose, register, setValue}}>
            <form style={formContainer} onSubmit={handleSubmit(formSubmit, onError)} 
            onClick={(e)=>e.stopPropagation()}>
                {children}
            </form>
        </FormContext>
    );
}

//Step .3 define the children components

//Form.Body
const Body = ({children, formBody})=>{
    
    return(
        <div style={formBody}>{children}</div>
    )
}

//Form.Header
const Header = ({children, formHeader})=>{
    return(
        <div style={formHeader}>{children}</div>
    )
}

//Here We define FormModel.Text
const Text = ({
    fieldName="", text="",type="text",inputStyle="",
     validation="",disable=false,placeholder=""
    })=>{
    const {register} = useContext(FormContext);
    return(
    <input type={type} style={inputStyle} defaultValue={text} {...register(fieldName,{
        validate: validation,
      })} disabled={disable} placeholder={placeholder}/>
)
}

//FormModel.Number
const Number = ({fieldName="", number=0, inputStyle="", validation=""})=>{
    const {register} = useContext(FormContext);
    return(
        <input type="number" style={inputStyle} defaultValue={number} {...register(fieldName,{
          validate:validation,
          })}/>
    )
}

//FormModel.Label
const Label = ({children, labelStyle})=>{
    return(
        <label style={labelStyle}>{children}</label>
    )
}

//FormModel.Date
const Date = ({inputStyle, date, fieldName, validation})=>{
    const {register} = useContext(FormContext);
    return(
        <input type="date" style={inputStyle} defaultValue={date} {...register(fieldName,{
            validate: validation,
          })} />
    )
}

//Here We define FormModel.Select
const Select = ({children,fieldName, selected, inputStyle, validation=""})=>{
    const {register} = useContext(FormContext);
    return(
    <select style={inputStyle} defaultValue={selected} {...register(fieldName,{
        validate: validation,
    })}> {children}</select>

)
}

//Here We define FormModel.Option
const Option = ({optionValue, optionStyle, children})=>{
    const {register} = useContext(FormContext);
    return(
    <option style={optionStyle} value={optionValue}> {children} </option>
)
}

//Here We define FormModel.Text
const TextArea = ({children,fieldName, textArea, textAreaStyle, validation=""})=>{
    const {register} = useContext(FormContext);
    return(
    <textarea type="text" style={textAreaStyle} defaultValue={textArea} {...register(fieldName,{
        validate: validation,
      })}>{children}</textarea>
)
}

//FormModel.Row
const Row = ({children, formRow})=>{
    return(
        <div style={formRow}>{children}</div>
    )
}

//FormModel.ScrollableContainer
const ScrollableContainer = ({children, scrollableContainerStyle})=>{
    return(
        <div style={scrollableContainerStyle}>{children}</div>
    )
}

//FormModel.Row
const SubmitRow = ({children, submitRow})=>{
    return(
        <div style={submitRow}>{children}</div>
    )
}

//FormModel.File
const File = ({fileName, children,images: imageUrl, fStyles, validation})=>{
    const {register, setValue} = useContext(FormContext);

    const [isFileName, setFileName] = useState("");
    let imageName = false;

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log("file false");
      if (file) {
        setFileName(file.name);  // Set the file name once it's selected
        setValue("photo", [file]),
        console.log("file true");
      }
    };

    if(imageUrl.includes("http")){
    const url = new URL(imageUrl);
    imageName = url.pathname.split('/').pop();
    }
    else if(!imageUrl.includes("http")){
        imageName = "No file chosen";
    }
  
  console.log(fileName);
    return(
        <>
        <input id="file" type="file" style={{display:"none"}} accept="image/*" {...register(fileName,{
            validate: validation,
            })} onChange={handleFileChange} /> 
        <label htmlFor="file" style={fStyles[0]} ><span style={fStyles[1]}>{children}</span>
        {isFileName? isFileName : imageUrl ? imageName :  "No file chosen"}
        </label>
        </>
    )
}

//FormModel.File
const Submit = ({children, submitButton})=>{
    return(
        <button type="submit" style={submitButton}>{children}</button>
    )
}

//FormModel.Cancel
const Cancel = ({children, cancelStyle})=>{
    const {handleClose} = useContext(FormContext);
    return(
        <button type="button" style={cancelStyle} onClick={handleClose}>{children}</button>
    )
}

//FormModel.Icon
const Icon = ({children, iconStyle})=>{
    const {handleClose} = useContext(FormContext);
    return(
        <button type="button" style={iconStyle} onClick={handleClose}>{children}</button>
    )
}

//FormModel.CheckBox
const Checkbox = ({checkBoxStyle, checkbox, fieldName})=>{
    const {register} = useContext(FormContext);
    return(
        <>
        <input type="checkbox" id="checkbox" style={checkBoxStyle} defaultValue={checkbox} 
        {...register(fieldName,{})} />

        {/* <label htmlFor="checkbox" style={checkBoxStyle}></label> */}
        </>
    )
}

//Step .4 Add the children components as properties to their parent 
FormContainer.Body = Body;
FormContainer.Header = Header;
FormContainer.Text = Text;
FormContainer.Number = Number;
FormContainer.Label = Label;
FormContainer.Row = Row;
FormContainer.ScrollableContainer = ScrollableContainer;
FormContainer.SubmitRow = SubmitRow;
FormContainer.File = File;
FormContainer.Submit = Submit;
FormContainer.Cancel = Cancel;
FormContainer.Icon = Icon;
FormContainer.Date = Date;
FormContainer.Select = Select;
FormContainer.Option = Option;
FormContainer.TextArea = TextArea;
FormContainer.Checkbox = Checkbox;

export default FormContainer;