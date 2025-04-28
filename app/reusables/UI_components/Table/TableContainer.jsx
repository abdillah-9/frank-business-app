"use client";
import { HiUser, HiUserCircle } from '@node_modules/react-icons/hi';
import {TfiUser} from "react-icons/tfi"
import {PiUserListThin} from "react-icons/pi";
import React, { createContext, useContext } from 'react';

//Step .1 create context API
const TableContext = createContext();

const TableContainer = ({arr, children, styleTable}) => {

  return (
    <TableContext value={{}} >
      <table style={styleTable}>{children}</table>
    </TableContext>
  );
};

//step .3 define children components
//TR
export function TR ({children, styleTR}){
  const {} = useContext(TableContext);

  return(
    <tr style={styleTR}>{children}</tr>
  )
}

//tHead
export function THead ({children}){
  const {} = useContext(TableContext);

  return(
    <thead>{children}</thead>
  )
}

//tBody
export function TBody ({children}){
  const {} = useContext(TableContext);

  return(
    <tbody>{children}</tbody>
  )
}

//TH
export function TH ({children, styleTH}){
  const {} = useContext(TableContext);

  return(
    <th style={styleTH}>{children}</th>
  )
}

//TD
export function TD ({children, styleTD}){
  const {} = useContext(TableContext);

  return(
    <td style={styleTD}>{children}</td>
  )
}

//Icon
const Icon =({children, title="", styleIcon})=>{
  const {} = useContext(TableContext);

  return(
    <span title={title} style={styleIcon}>{children}</span>
  )
}

//Image
const Image =({styleImage,styleUserIcon, alt, src})=>{
  const {} = useContext(TableContext);
  console.log(src)

  return(
    src !== "defaultUserIcon" ?
    <img  style={styleImage} alt={alt} src={src}/> : 
    <div style={styleUserIcon}><Icon><TfiUser/></Icon></div> 
    //<Icon><PiUserListThin/></Icon>
    
  )
}

//step .4 use the children comps as props
TableContainer.THead = THead;
TableContainer.TBody = TBody;
TableContainer.TR = TR;
TableContainer.TH = TH;
TableContainer.TD = TD;
TableContainer.Icon = Icon;
TableContainer.Image = Image;

export default TableContainer;
