"use client"
import useUser from '@app/authentication/hooks/useUser'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy'
import { getSettingsData} from '@utils/apiSettings'
import React, { useEffect } from 'react'
import { useCreateSettings } from './settingsHooks/useCreateSettings'
import { useUpdateFormData } from './settingsHooks/useUpdateSettings'
import { useDeleteFormData } from './settingsHooks/useDeleteSettings'
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux'
import { setReduxState } from '@app/provider/redux/reducer'
import { getBudgetData } from '@utils/apiBudget'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import Form from './Form'
import Container from '@app/reusables/UI_components/Container'
import Button from '@app/reusables/UI_components/Button'
import Icon from '@app/reusables/UI_components/Icon'
import { BiAddToQueue } from '@node_modules/react-icons/bi'

export default function Settings() {
    const {user} = useUser();
    const {data: settings, isLoading: settingsLoading} = useQuery({
        queryKey:["settingsData"],
        queryFn: getSettingsData
    })
    const {insertDataMutation} = useCreateSettings();
    const {updateDataMutation} = useUpdateFormData();
    const {mutateDeleting} = useDeleteFormData();
    const {isLoading: budgetLoading, data: budget, error} =  useQuery({
        queryKey: ['budgetData'],
        queryFn: getBudgetData
    });

    const dispatch = useDispatch();
    const formState = useSelector((store)=>store.ReduxState.showForm);
    const overlayState = useSelector((store)=>store.ReduxState.overlay);

    console.log("user "+JSON.stringify(user))
    console.log("settings "+JSON.stringify(settings))
    console.log("budget "+JSON.stringify(budget))

    useEffect(
        ()=>{
            if(!user || user.length === 0 || !settings || !budget){
                return
            }
        },
        [user, settings, budget]
    )
    if(!user || user.length === 0 || !settings || !budget){
        return <LoadingSpinner/>
    }
    function showFormHandler(){
        dispatch(setReduxState(
            {showForm: !formState, overlay: !overlayState, fetchedFormData: false}
        ));
    }


    //CSS
    const createButton={
        width:"80%",
        backgroundColor:"rgba(79, 8, 161, 0.76)",
        boxShadow:"1px 2px 15px rgb(0, 0, 0)",
        padding:"8px",
        color:"white",
        fontSize:"14px",
        display:"flex",
        gap:"6px",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"5px",
    }
    const heading ={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        fontSize:"17px",
        width:"100%",
        fontWeight:500,
        color:"rgb(63, 55, 63)",
        textTransform:"uppercase",
        textAlign:"center",
    }
    const budget_categories={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between",
        gap:"17px",
        borderRadius:"0px",
        minHeight:"80vh",
        borderLeft:"3px solid rgba(79, 8, 161, 0.64)",
        borderRight:"3px solid rgba(79, 8, 161, 0.64)",
        color:"rgba(79, 8, 161, 0.76)",
        fontSize:"15px",
        fontWeight:500,
        padding:"10px 5px",
        textTransform:"capitalize",
    }

    const cats={
        padding:"0px 5px",
        borderLeft:"1px solid rgba(79, 8, 161, 0.76)",
    }
  return (
    <div>
        <Form budget={budget} user={user} insertDataMutation={insertDataMutation}
        updateDataMutation={updateDataMutation}/>
        <div style={budget_categories}>
            <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                <div style={heading}>budgets categories</div>
                <div style={{ display:"flex",flexWrap:"wrap", gap:"20px", justifyContent:"center" }}>
                {
                    settings ? settings.filter((row)=>row.userID == user.id)
                    .map((row, index)=>
                        <div style={cats} key={index} className='categoriesAnime'>
                            {++index+". "}{row.budget_categories}
                        </div>      
                    ) : "No data has been found..."
                }
                </div>
            </div>
            <Button buttonStyle={createButton} actionHandler={showFormHandler}>
                <Icon><BiAddToQueue /></Icon>Add new category
            </Button>                    
        </div>   
    </div>
  )
}
