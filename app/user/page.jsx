"use client"
import React from 'react'
import Table from './Table'
import Container from '@app/reusables/UI_components/Container'
import Texts from '@app/reusables/UI_components/Texts'
import Button from '@app/reusables/UI_components/Button'
import Icon from '@app/reusables/UI_components/Icon'
import {BiAddToQueue} from 'react-icons/bi'
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux'
import { setReduxState } from '@app/provider/redux/reducer'
import Form from './Form'

export default function page() {
  const dispatch = useDispatch();
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const overlayState = useSelector((store)=>store.ReduxState.overlay);

  function showFormHandler(){
    dispatch(setReduxState({showForm: !formState, overlay: !overlayState}));
  }

  return (
    <div style={expensContainer}>
      <Form/>
      <Container>
        <Texts textStyle={headingStyle}>Active user</Texts>
      </Container>
      <Container containerStyle={tableContainer}>
        <Table/>
      </Container>   
      <Container>
        <Button buttonStyle={createButton} actionHandler={showFormHandler}>
          <Icon><BiAddToQueue /></Icon>Update user
        </Button>
      </Container>  
    </div>
  )
}

//CSS
const expensContainer={
  display:"flex",
  flexDirection:"column",
  gap:"30px",
  height:"100%",
}

const headingStyle={
  fontSize:"20px",
  fontWeight:500,
}

const tableContainer={
  height:"100%",
  overflow:"auto"
}

const buttonWidth={
  textAlign:"left",padding:"5px", fontSize:"13px"
}

const buttonsContainer={
  boxShadow:"2px 3px 20px rgb(70, 68, 68)",
  width:"fit-content",
  backgroundColor:"white"
}

const createButton={
  width:"100%",
  backgroundColor:"rgba(79, 8, 161, 0.76)",
  boxShadow:"1px 1px 10px rgb(40, 33, 43)",
  padding:"8px",
  color:"white",
  fontSize:"14px",
  display:"flex",
  gap:"6px",
  justifyContent:"center",
  alignItems:"center",
}
