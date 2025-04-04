import FilterComponent from '@app/UI components/Filter-Sort Operations/FilterComponent'
import Overlay from '@app/UI components/Overlay/Overlay';
import { setOverlay } from '@app/UI components/Overlay/reduxSlice/overlayReducer';
import { HiOutlineFilter, HiXCircle } from '@node_modules/react-icons/hi'
import { useDispatch } from '@node_modules/react-redux/dist/react-redux';
import React, { useState } from 'react'

export default function TasksFilterModel() {
    const dispatch = useDispatch();

    const [filter,setFilter] = useState(false);

    function handleShowFilterForm(){
        setFilter(!filter);
    }
    
  return (
    <FilterComponent styleFilterComponent={filterComponentStyle}>
        <FilterComponent.FilterRow styleFilterRow={styleFilterRow}> 
            <FilterComponent.FilterButton styleFilterButton={styleFilterButton} 
              buttonAction={handleShowFilterForm}>
                <HiOutlineFilter/> Filter
            </FilterComponent.FilterButton>
        </FilterComponent.FilterRow>
{filter? 

    <FilterComponent.FilterOverlay filterOverlay={filterOverlay} clickAction={handleShowFilterForm}>
        <FilterComponent.FilterFormBody formBody={formBody}>

           <FilterComponent.FilterRow styleFilterRow={submitRow}>
                <FilterComponent.FilterButton styleFilterButton={styleFilterButton} 
                  buttonAction={handleShowFilterForm}>
                    <FilterComponent.FilterIcon  styleFilterIcon={iconStyle} >
                        <HiXCircle/>
                    </FilterComponent.FilterIcon>
                </FilterComponent.FilterButton>
            </FilterComponent.FilterRow>

            <FilterComponent.FilterRow styleFilterRow={styleFilterRow}>
                <FilterComponent.FilterLabel labelStyle={labelStyle}>name</FilterComponent.FilterLabel>
                <FilterComponent.FilterInputStd inputStyle={inputStyle} inputType={"text"} />
            </FilterComponent.FilterRow>

            <FilterComponent.FilterRow styleFilterRow={styleFilterRow}>
                <FilterComponent.FilterLabel labelStyle={labelStyle}>status</FilterComponent.FilterLabel>
                <FilterComponent.FilterInputStd inputStyle={inputStyle} inputType={"text"} />
            </FilterComponent.FilterRow>

            <FilterComponent.FilterRow  styleFilterRow={styleFilterRow}>
                <FilterComponent.FilterLabel labelStyle={labelStyle}>date</FilterComponent.FilterLabel>
                <FilterComponent.FilterInputStd inputStyle={inputStyle} inputType={"text"} />
            </FilterComponent.FilterRow>

            <FilterComponent.FilterRow styleFilterRow={submitRow}>
                <FilterComponent.FilterButton styleFilterButton={cancelStyle} 
                  buttonAction={handleShowFilterForm}>
                    Cancel
                </FilterComponent.FilterButton>
                <FilterComponent.FilterButton styleFilterButton={submitButton} buttonType={"submit"}>
                    Filter
                </FilterComponent.FilterButton>
            </FilterComponent.FilterRow>
        </FilterComponent.FilterFormBody>
    </FilterComponent.FilterOverlay>

 : "" }

    </FilterComponent>
  )
}

let padding = "5px 15px";

const filterOverlay={
    position:"fixed",
    width:"100vw",
    height:"100vh",
    backdropFilter: "blur(3px)",
    top:"0",
    left:"0",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
}


const formBody ={
    display:"flex",
    flexDirection:"column",
    backgroundColor: "white",
    borderRadius: "5px",
    width:"70%",
    minWidth:"300px",
    maxWidth:"1000px",
    padding:" 0px 25px 25px 25px",
    boxShadow:" 5px 5px 30px rgba(2, 10, 56, 0.92)",

}

const styleFilterRow={
    flexDirection:"row",
    alignItems:"center",
    display:"flex",
    gap:"28%",
    padding: "5px", 
    borderBottom: "1px solid rgba(220,220,240,0.5)"
}

const styleFilterButton={
    flexDirection:"row",
    gap:"2px",
    alignItems:"center",
    display:"flex",
}

const filterComponentStyle={
    display:"flex",
    backgroundColor: "white",
    fontSize: "14px",
    paddingRight:"10px",
    borderRadius: "5px",
    boxShadow:" 1px 1px 10px rgba(2, 10, 56, 0.92)",
}
// ********************* COMPONENTS CSS STYLING ****************************//

const iconStyle ={
    fontSize:"30px",
    color: "rgb(245, 5, 5)",
}

const cancelStyle={
    backgroundColor:"white",
    color: "black", 
    border:"1px solid rgba(220,220,220,1)", 
    borderRadius:"5px",
    padding,
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
    width: "30px",
    padding: "2px 0px",
    color: "rgb(10, 10, 24)",
  }

const submitButton={
    backgroundColor:"rgb(14, 165, 233)",
    borderRadius:"5px",
    padding,
    color: "white",
}