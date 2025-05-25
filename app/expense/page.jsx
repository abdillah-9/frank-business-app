"use client"
import React, { Suspense, useEffect, useState } from 'react'
import Table from './Table'
import Container from '@app/reusables/UI_components/Container'
import Texts from '@app/reusables/UI_components/Texts'
import Button from '@app/reusables/UI_components/Button'
import Icon from '@app/reusables/UI_components/Icon'
import {BiAddToQueue} from 'react-icons/bi'
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux'
import { setReduxState } from '@app/provider/redux/reducer'
import Form from './Form'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy'
import { getBudgetData } from '@utils/apiBudget'
import { getExpenseData } from '@utils/apiExpense'
import { useCreateExpense } from './expenseHooks/useCreateExpense'
import useUser from '@app/authentication/hooks/useUser'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import DeletePrompt from '@app/reusables/UI_components/deletePrompt'
import { useDeleteFormData } from './expenseHooks/useDeleteExpense'
import { useUpdateFormData } from './expenseHooks/useUpdateExpense'
import Pagination from '@app/reusables/UI_components/Pagination'
import { HiChevronLeft, HiChevronRight, HiOutlineChevronLeft } from '@node_modules/react-icons/hi2'
import { TbMoodEmpty, TbMoodEmptyFilled } from '@node_modules/react-icons/tb'

export default function page() {
  //Using React Query to fetch data from supabase
    const {insertDataMutation} = useCreateExpense();
    const {updateDataMutation} = useUpdateFormData();
    const {mutateDeleting} = useDeleteFormData();
    const {user} = useUser();
    const [sortState, setSortState] = useState("all");
    const [fetched, setFetched] = useState({
      expenseData:[],
      budgetData:[],
    })  
    const [pageNumber, setPageNumber] = useState(1);
    const [pageRows, setPageRows] = useState(4);
  
  const {isLoading: budgetLoading, data: budget, error} =  useQuery({
    queryKey: ['budgetData'],
    queryFn: getBudgetData
  });

  //Using React Query to fetch data from supabase
  const {isLoading:expenseLoading, data: expense, error:expenseError} =  useQuery({
    queryKey: ['expenseData'],
    queryFn: getExpenseData
  });

  useEffect(()=>{
    if(expense && budget && user){
      let expenseData = expense.filter((row)=>row.userID == user.id)
      let budgetData = budget.filter((row)=>row.userID == user.id)
      setFetched({expenseData, budgetData});
    }
  },[expense, budget])

  const dispatch = useDispatch();
  const formState = useSelector((store)=>store.ReduxState.showForm);
  const overlayState = useSelector((store)=>store.ReduxState.overlay);

  if(!user || expenseLoading || budgetLoading){
    return <LoadingSpinner/>
  }
  if(fetched.budgetData.length == 0 || fetched.expenseData.length == 0){
    return (
            <div style={{fontSize:"14px", display:"flex", gap:"10px", justifyContent:"space-between",
            width:"100%",height:"100%", alignItems:"center", flexDirection:"column"}}>
              <DeletePrompt mutateDeleting={mutateDeleting}/>
      <Container containerStyle={{width:"100%", display:"flex", justifyContent:"space-between"}}>
        <Texts textStyle={headingStyle}>All expenses</Texts>
        <Container containerStyle={buttonsContainer}>
          <Button buttonStyle={
            sortState == "all" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
          } 
          actionHandler={()=>sortButtonHandler("all")}>
            All
          </Button>
          <Button 
            buttonStyle={
            sortState == "confirmed" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
            } 
            actionHandler={()=>sortButtonHandler("confirmed")}>
            Confirmed
          </Button>
          <Button buttonStyle={
            sortState == "unConfirmed" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
          } actionHandler={()=>sortButtonHandler("unConfirmed")}>
            Unconfirmed
          </Button>
        </Container>
      </Container>
              <div style={{display:"flex",alignItems:"center",flexDirection:"column", gap:"15px"}}>
                <div>No data can be shown, please insert new to get started...</div> 
                <Icon iconStyle={iconStyle}><TbMoodEmptyFilled/></Icon> 
              </div>
              <Container containerStyle={{width:"100%"}}>
                <Button buttonStyle={createButton} actionHandler={showFormHandler}>
                  <Icon><BiAddToQueue /></Icon>Create expense
                </Button>
              </Container>
              <Form budget={budget} user={user} insertDataMutation={insertDataMutation}
              updateDataMutation={updateDataMutation}/>
            </div>
    )
  }

  function showFormHandler(){
    dispatch(setReduxState({showForm: !formState, overlay: !overlayState, fetchedFormData: false}));
  }

  function sortButtonHandler(sortByString){
    console.log("sortByString: "+sortByString)
    let expenseData;
    let budgetData;

    if(sortByString == "all"){
      setSortState(sortByString)
      expenseData = expense.filter((row)=>row.userID == user.id)
      budgetData = budget.filter((row)=>row.userID == user.id)
    }

    else if(sortByString == "confirmed"){
      setSortState(sortByString)
      expenseData = expense.filter((row)=>row.userID == user.id && row.status == "confirmed")
      budgetData = budget.filter((row)=>row.userID == user.id)
    }
    else if(sortByString == "unConfirmed"){
      setSortState(sortByString)
      expenseData = expense.filter((row)=>row.userID == user.id && row.status == "unConfirmed")
      budgetData = budget.filter((row)=>row.userID == user.id)
    }

    else{
      setSortState(sortByString)
      expenseData = expense.filter((row)=>row.userID == user.id)
      budgetData = budget.filter((row)=>row.userID == user.id)  
    }

    setFetched({expenseData,budgetData})
  }

  function prev(){
    if(pageNumber > 1){
    setPageNumber(pageNumber -1)
  }
  }

  function next(){
    if(pageNumber < (fetched.expenseData.length / pageRows)){
      setPageNumber(pageNumber +1)
    }
  }

  return (
    <div style={expensContainer}>
      <Form budget={budget} user={user} insertDataMutation={insertDataMutation}
       updateDataMutation={updateDataMutation}/>
      <DeletePrompt mutateDeleting={mutateDeleting}/>
      <Container>
        <Texts textStyle={headingStyle}>All expenses</Texts>
        <Container containerStyle={buttonsContainer}>
          <Button buttonStyle={
            sortState == "all" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
          } 
          actionHandler={()=>sortButtonHandler("all")}>
            All
          </Button>
          <Button 
            buttonStyle={
            sortState == "confirmed" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
            } 
            actionHandler={()=>sortButtonHandler("confirmed")}>
            Confirmed
          </Button>
          <Button buttonStyle={
            sortState == "unConfirmed" ? {...buttonWidth, ...activeSort} : {...buttonWidth}
          } actionHandler={()=>sortButtonHandler("unConfirmed")}>
            Unconfirmed
          </Button>
        </Container>
      </Container>
      <Container containerStyle={tableContainer}>
        <Table 
          budget={fetched.budgetData} 
          expense={fetched.expenseData} 
          user={user} 
          sortState={sortState}
          pageNumber={pageNumber}
          pageRows={pageRows}
        />
        <Pagination>
          <Pagination.Desc>
            {console.log(JSON.stringify(fetched.expenseData))}
            <div>
              <span>Showing </span> {(pageNumber - 1)*pageRows + 1} 
              <span> to </span> {Math.min(pageNumber * pageRows, fetched.expenseData.length)} 
              <span> results of </span> {fetched.expenseData.length}
            </div>
          </Pagination.Desc>
          <Pagination.ButtonsBody>
            <Button actionHandler={prev} buttonStyle={paginateButton}>
              <Icon><HiChevronLeft/></Icon><div>Prev</div>
            </Button>
            <Button actionHandler={next} buttonStyle={paginateButton}>
              <div>Next</div><Icon><HiChevronRight/></Icon>
            </Button>
          </Pagination.ButtonsBody>
        </Pagination>
      </Container>   
      <Container>
        <Button buttonStyle={createButton} actionHandler={showFormHandler}>
          <Icon><BiAddToQueue /></Icon>Create expense
        </Button>
      </Container>  
    </div>
  )
}

//CSS
const iconStyle={
  padding:"0px 5px",
  fontSize:"35px",
  color:"rgba(79, 8, 161, 0.76)",
}
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
  textAlign:"left",padding:"10px", fontSize:"13px"
}
const activeSort={
  color:"white",
  backgroundColor:"rgba(79, 8, 161, 0.76)",  
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

const paginateButton={
  display:"flex",
  gap:"3px",
  alignItems:"center",
  fontWeight:500,
  fontSize:"14px",
}
