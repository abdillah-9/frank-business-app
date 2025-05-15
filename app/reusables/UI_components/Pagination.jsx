"use client"

export default function Pagination({children, pagination=paginationStyle}){
    return(
        <div style={pagination}>
            {children}
        </div>
    )
}

function Desc({children, desc=defaultDesc}){
    return(
        <div style={desc}>
            {children}
        </div>
    )
}

function ButtonsBody({children, buttonsBody=buttonsBodyStyle}){
    return(
        <div style={buttonsBody}>
            {children}
        </div>
    )
}

Pagination.Desc = Desc;
Pagination.ButtonsBody = ButtonsBody;

//CSS
const paginationStyle={
    display:"flex",
    justifyContent:"space-between",
    padding:"20px 0px",
    fontSize:"15px",
}
const buttonsBodyStyle={
    display:"flex",
    gap:"20px",
}
const defaultDesc={
    fontSize:"14px",
    fontWeight:500,
}