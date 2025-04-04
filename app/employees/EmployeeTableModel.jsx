"use client"
import TableContainer from "@app/UI components/Table/TableContainer";
import { HiTrash, HiPencil} from "@node_modules/react-icons/hi";
import { setOverlay } from "@app/UI components/Overlay/reduxSlice/overlayReducer";
import { useDispatch} from "@node_modules/react-redux/dist/react-redux";
import { useDeleteFormData } from "./employees hooks/useDeleteFormData";


function EmployeeTableModel({data}){
    console.log(data);

    let dispatch = useDispatch();

    const {loadingDelete, mutateDeleting} = useDeleteFormData();
  
    const handleEditData = (dataRow)=>{
      dispatch(setOverlay({overlay: true, fetchedFormData: dataRow}));
    }

    return(
        <TableContainer styleTable={styleTable}>

            <TableContainer.THead>
            <TableContainer.TR styleTR={styleTR}>
                <TableContainer.TH styleTH={styleTH}>id</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>full name</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>age</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>date created</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>status</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>photo</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>actions</TableContainer.TH>
            </TableContainer.TR>
            </TableContainer.THead>

            <TableContainer.TBody>
            { data.map(dataRow=>
            <TableContainer.TR styleTR={styleTR} key={dataRow.id}>
                <TableContainer.TD styleTD={styleTD}> {dataRow.id} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.name} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.age} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.dateCreated} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.status} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> 
                    <TableContainer.Image styleImage={styleImage} styleUserIcon={styleUserIcon}
                    src={dataRow.images} alt={"photo"}/> 
                </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}>
                    <TableContainer.Icon styleIcon={styleIcon} title={"edit"} iconAction={handleEditData}>
                        <HiPencil onClick={()=>handleEditData(dataRow)}/> 
                    </TableContainer.Icon>
                    <TableContainer.Icon styleIcon={styleIcon} title={"delete"} iconAction={mutateDeleting}>
                        <HiTrash onClick={()=>mutateDeleting(dataRow.id)}/>
                    </TableContainer.Icon>
                </TableContainer.TD>
            </TableContainer.TR>
            )}
            </TableContainer.TBody>

        </TableContainer>
    )
}

//Css f0r above comps
const styleTable={
    width:"100%",
    fontSize:"14px",
}
const styleTR ={
    textAlign: "left",
    display:"flex",
    width:"100%",
    alignItems:"center",
    backgroundColor:"rgba(200,200,200,0)",
}

const styleTH ={
    padding:"10px",
    fontSize:"15px",
    display:"flex",
    width:"16.667%",
    minWidth:"120px",
    backgroundColor:"rgba(87, 94, 97, 0.45)",
    //backgroundColor:"rgb(100, 184, 240)",
    border:"1px solid rgba(200,200,200,0.8)",
}

const styleTD ={
    padding:"5px 10px",
    display:"flex",
    gap:"7px",
    width:"16.667%",
    minWidth:"100px",
    //border:"1px solid rgba(200,200,200,0.8)",
}

const styleImage ={
    width:"50px",
    height:"40px",
    borderRadius:"0%",    
}

const styleIcon ={
    height:"fit-content",
    padding:"2px",
    border:"1px solid rgba(200,200,200,1)",
    backgroundColor:"rgba(200,200,200,0.5)",
    cursor:"pointer",
}
const styleUserIcon ={
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    width:"50px",
    height:"40px",
    //backgroundColor:"rgba(200,200,200,0.5)",
    fontSize:"25px",
    color:"rgb(49, 56, 56)",
}

export default EmployeeTableModel;