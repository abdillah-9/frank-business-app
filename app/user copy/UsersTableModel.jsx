"use client"
import TableContainer from "@app/UI components/Table/TableContainer";
import { HiTrash, HiPencil} from "@node_modules/react-icons/hi";
import { setOverlay } from "@app/UI components/Overlay/reduxSlice/overlayReducer";
import { useDispatch} from "@node_modules/react-redux/dist/react-redux";
import useDeleteFormData from "./user hooks/useDeleteFormData";

function UsersTableModel({data}){
    let numb =1;
    console.log("list of all users :"+data);
    const {users} = data;
    console.log("list of all users :"+JSON.stringify(users[0]));

    let dispatch = useDispatch();

    const {deleteUser, errOnDeleteUser} = useDeleteFormData();
  
    const handleEditData = (dataRow)=>{
      dispatch(setOverlay({overlay: true, fetchedFormData: dataRow}));
    }

    return(
        <TableContainer styleTable={styleTable}>

            <TableContainer.THead>
            <TableContainer.TR styleTR={styleTR}>
                <TableContainer.TH styleTH={styleTH}>No</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>full name</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>email</TableContainer.TH>
                {/* <TableContainer.TH styleTH={styleTH}>password</TableContainer.TH> */}
                <TableContainer.TH styleTH={styleTH}>avatar</TableContainer.TH>
                <TableContainer.TH styleTH={styleTH}>actions</TableContainer.TH>
            </TableContainer.TR>
            </TableContainer.THead>

            <TableContainer.TBody>
            { users? users.map(dataRow=>
            <TableContainer.TR styleTR={styleTR} key={dataRow.id}>
                <TableContainer.TD styleTD={styleTD}> {numb++} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.user_metadata.fullName} </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}> {dataRow.email} </TableContainer.TD>
                {/* <TableContainer.TD styleTD={styleTD}> {dataRow.password} </TableContainer.TD> */}
                <TableContainer.TD styleTD={styleTD}> 
                    <TableContainer.Image styleImage={styleImage}  
                    styleUserIcon={styleUserIcon} alt={"photo"}
                    src={dataRow.user_metadata.avatar?dataRow.user_metadata.avatar:"defaultUserIcon"} /> 
                </TableContainer.TD>
                <TableContainer.TD styleTD={styleTD}>
                    <TableContainer.Icon styleIcon={styleIcon} title={"edit"} iconAction={handleEditData}>
                        <HiPencil onClick={()=>handleEditData(dataRow)}/> 
                    </TableContainer.Icon>
                    <TableContainer.Icon styleIcon={styleIcon} title={"delete"} >
                        <HiTrash onClick={()=>deleteUser(dataRow.id)}/>
                    </TableContainer.Icon>
                </TableContainer.TD>
            </TableContainer.TR>
            ): ""}
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
    width:"20%",
    minWidth:"120px",
    backgroundColor:"rgba(87, 94, 97, 0.45)",
    //backgroundColor:"rgb(100, 184, 240)",
    border:"1px solid rgba(200,200,200,0.8)",
}

const styleTD ={
    padding:"5px 10px",
    display:"flex",
    gap:"7px",
    width:"20%",
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


export default UsersTableModel;