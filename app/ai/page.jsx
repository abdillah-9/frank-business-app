"use client"
import React, { useEffect, useState } from 'react'
import Insights from './Insights'
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy'
import { getBudgetData } from '@utils/apiBudget'
import { getExpenseData } from '@utils/apiExpense'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import useUser from '@app/authentication/hooks/useUser'
import Icon from '@app/reusables/UI_components/Icon'
import { TbMoodEmptyFilled } from '@node_modules/react-icons/tb'

export default function page() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState("")
    //Import user, budget and expense data here
    const {user, isLoading: userLoading} = useUser();

    const {data: budget, isLoading: budgetLoading} = useQuery({
        queryKey:["budgetData"],
        queryFn: getBudgetData,
    })

    const {data: expense, isLoading: expenseLoading} = useQuery({
        queryKey:["expenseData"],
        queryFn: getExpenseData,
    })

    const [budgetStats, setBudgetStats] = useState([])
    const [AI_response, setAI_response] = useState("")

    // create array containing budgets with sum of its expenses 
    // structure should be as const combinedData = [budgetID,budgetName,budgetAmount,expenseTotal]
    useEffect(()=>{
        if(!user || !budget || !expense){
            return; 
        }

        // *** First calculate total for each expense sumOfEachExpense = [{expenseID,expenseTotal}] *** //
        const sumOfEachExpense = expense.filter((exp)=> exp.userID == user.id)
            .reduce((acc, item)=>{
            const exists = acc.find((row)=>row.expBudgetID == item.budgetID);
        
        if (exists) {
            exists.expenseTotal += item.amount;
            exists.allExpenses.push({name:item.name, amount:item.amount, date:item.date})
        } 
        else {
            acc.push({ 
                expBudgetID: item.budgetID, 
                expenseTotal: item.amount, 
                allExpenses:[{name:item.name, amount:item.amount, date:item.date}], 
            });
        }
        return acc
    },[])
    
    // ******* Finally create combinedData based on given structure above ****** //
    const combinedData = budget.reduce((acc, item)=>{
        const exists = sumOfEachExpense.find((row)=>row.expBudgetID == item.id)

        if(exists){
            acc.push({ 
                budgetID:item.id, 
                budgetName:item.name, 
                budgetAmount:item.amount,
                allExpenses: exists.allExpenses, 
                expenseTotal: exists.expenseTotal
            })
        }

        return acc
    },[])

    console.log("combined data for backend is "+JSON.stringify(combinedData))
    setBudgetStats(combinedData)

    },[user, budget, expense])

    //fetch AI insights based on this api call
    useEffect(()=>{
        if (!budgetStats || budgetStats.length === 0) {
            console.log("budgetStats is empty, not sending to backend yet.");
            return;
        }
    
        console.log("budgetStats", JSON.stringify(budgetStats));

        const fetchData = async () => {
            try {
              //'http://localhost:8000/predict'
              //https://frank-business-ai.onrender.com/predict
              const response = await fetch('https://frank-business-ai.onrender.com/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(budgetStats)
              });
      
              const data = await response.json();
              console.log("data fetched from ai "+JSON.stringify(data));
              setAI_response(data);
            } catch (error) {
              console.error('Error fetching prediction:', error);
            }
          };
      
          fetchData();
    }
    ,[budgetStats])

    //handleSearch
    const handleSearch = ()=>{
      useEffect(()=>{
        async function sendData(){
           const chatBot = 
            fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",{
            headers:{"Content-Type":"application/json"},
            methos:"POST",
            body:JSON.stringify(search)
           });

           const chatBotRes = await chatBot.json();
           setRes(chatBotRes);
        }

        sendData()
      }
      ,[])
    }

  return (
    <div>
      {/* <div>
        <input type='text' name='search' placeholder='search' onChange={(e)=>setSearch(e.target.value)} />
        <input type='submit' name='submit' onClick={()=>handleSearch}/>
      </div>
      <div>
        {res}
      </div> */}
        {
            userLoading || expenseLoading || budgetLoading ? 
            <LoadingSpinner/> : 
            AI_response === "" ? 
            <div style={{fontSize:"14px", display:"flex", gap:"10px", boxShadow:"2px 2px 30px rgb(10,10,10)",
            width:"100%",height:"100%", alignItems:"center", flexDirection:"column"}}>
              <div>It looks like you have neither expenses nor budgets,
                please insert new data to receive AI-insights...</div> 
              <Icon iconStyle={iconStyle}><LoadingSpinner/></Icon> 
            </div> 
            : 
            <Insights data={AI_response} stats={budgetStats}/> 
        }
    </div>
  )
}

//CSS
const iconStyle={
  padding:"0px 5px",
  fontSize:"35px",
  color:"rgba(79, 8, 161, 0.76)",
}
