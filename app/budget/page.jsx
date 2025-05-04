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
import DeletePrompt from '@app/reusables/UI_components/deletePrompt'
import { useDeleteFormData } from './budgetHooks/useDeleteBudget'
import { useCreateBudget } from './budgetHooks/useCreateBudget'
import { useUpdateFormData } from './budgetHooks/useUpdateBudget'
import useUser from '@app/authentication/hooks/useUser'

export default function page() {
  //Using React Query to fetch data from supabase
    const {insertDataMutation} = useCreateBudget();
    const {updateDataMutation} = useUpdateFormData();
    const {mutateDeleting} = useDeleteFormData();
    const {user} = useUser();

  const dispatch = useDispatch();
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const overlayState = useSelector((store)=>store.ReduxState.overlay);

  function createHandlerFunc(){
    dispatch(setReduxState({showForm: !formState, overlay: !overlayState,fetchedFormData: false}));
  }

  return (
    <div style={expensContainer}>
      <Form updateDataMutation={updateDataMutation} insertDataMutation={insertDataMutation} user={user}/>
      <DeletePrompt mutateDeleting={mutateDeleting}/>
      <Container>
        <Texts textStyle={headingStyle}>All budgets</Texts>
        <Container containerStyle={buttonsContainer}>
          <Button buttonStyle={buttonWidth}>All</Button>
          <Button buttonStyle={buttonWidth}>Confirmed</Button>
          <Button buttonStyle={buttonWidth}>Unconfirmed</Button>
        </Container>
      </Container>
      <Container containerStyle={tableContainer}>
        <Table/>
      </Container>   
      <Container>
        <Button buttonStyle={createButton} actionHandler={createHandlerFunc}>
          <Icon><BiAddToQueue /></Icon>Create budget
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
