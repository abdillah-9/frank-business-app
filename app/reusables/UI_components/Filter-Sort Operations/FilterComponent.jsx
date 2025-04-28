import React, { createContext, useContext } from 'react'

const FilterContext = createContext();

function FilterComponent({children, styleFilterComponent}) {

  return (
    <FilterContext value={{}}>
      <div style={styleFilterComponent}>{children}</div>
    </FilterContext>
  )
}

const FilterOverlay = ({children, filterOverlay, clickAction})=>{
  return(
    <div style={filterOverlay} onClick={clickAction}>{children}</div>
  )
}
const FilterFormBody = ({children, formBody})=>{
  return(
    <form style={formBody} onClick={(e)=>e.stopPropagation()}>{children}</form>
  )
}
const FilterRow = ({children, styleFilterRow})=>{
  return(
    <div style={styleFilterRow}>{children}</div>
  )
}
const FilterButton = ({children, styleFilterButton, buttonAction})=>{
  const x = useContext(FilterContext);
  return(
    <button style={styleFilterButton} onClick={buttonAction}>{children}</button>
  )
}

const FilterSelect = ({children, styleFilterSelect, fieldName}) => {
  return(
    <select style={{styleFilterSelect}} name={fieldName}>{children}</select>
  )
}

const FilterOption = ({children, fieldValue})=>{
  return(
    <option value={fieldValue}>{children}</option>
  )
}

const FilterIcon = ({children,styleFilterIcon})=>{
  return(
    <i style={styleFilterIcon}>{children}</i>
  )
}

const FilterInputStd = ({inputType="text", inputStyle})=>{
  return(
    <input type={inputType} style={inputStyle} />
  )
}

const FilterLabel = ({children,labelStyle})=>{
  return(
    <label style={labelStyle}>{children}</label>
  )
}

FilterComponent.FilterOverlay = FilterOverlay;
FilterComponent.FilterFormBody = FilterFormBody;
FilterComponent.FilterRow = FilterRow;
FilterComponent.FilterButton = FilterButton;
FilterComponent.FilterIcon = FilterIcon;
FilterComponent.FilterSelect = FilterSelect;
FilterComponent.FilterOption = FilterOption;
FilterComponent.FilterLabel = FilterLabel;
FilterComponent.FilterInputStd = FilterInputStd;

export default FilterComponent;