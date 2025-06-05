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
        backgroundColor:"rgba(240, 83, 22, 0.76)",
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
        color:"rgba(207, 205, 207, 0.86)",
        textTransform:"uppercase",
        textAlign:"center",
    }
    const budget_categories={
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"17px",
        borderRadius:"5px",
        minHeight:"83vh",
        backgroundColor:"rgba(79, 8, 161, 0.64)",
        color:"rgb(247, 241, 245)",
        fontSize:"15px",
        fontWeight:200,
        padding:"10px 5px",
        textTransform:"capitalize",
        boxShadow:"2px 1px 15px rgba(15, 0, 32, 0.76)",
    }

    const cats={
        boxShadow:"2px 2px 10px rgb(0, 0, 0)",
        padding:"10px 15px",
        borderRadius:"5px",
        //color:"rgba(240, 83, 22, 0.76)",
        //backgroundColor:"rgba(220,220,220,1)",
    }
  return (
    <div>
        <Form budget={budget} user={user} insertDataMutation={insertDataMutation}
        updateDataMutation={updateDataMutation}/>
        <div style={budget_categories}>
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
            <Button buttonStyle={createButton} actionHandler={showFormHandler}>
                <Icon><BiAddToQueue /></Icon>Add category
            </Button>                    
        </div>   
    </div>
  )
}
