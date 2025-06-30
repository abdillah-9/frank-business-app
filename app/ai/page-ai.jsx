"use client"
import React, { useEffect, useState } from 'react'
import Insights from './Insights'
import { useQuery } from '@tanstack/react-query'
import { getBudgetData } from '@utils/apiBudget'
import { getExpenseData } from '@utils/apiExpense'
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner'
import useUser from '@app/authentication/hooks/useUser'
import Icon from '@app/reusables/UI_components/Icon'

export default function Page() {
  const [search, setSearch] = useState("")
  const [res, setRes] = useState("")
  const { user, isLoading: userLoading } = useUser()

  const { data: budget, isLoading: budgetLoading } = useQuery({
    queryKey: ["budgetData"],
    queryFn: getBudgetData,
  })

  const { data: expense, isLoading: expenseLoading } = useQuery({
    queryKey: ["expenseData"],
    queryFn: getExpenseData,
  })

  const [budgetStats, setBudgetStats] = useState([])
  const [AI_response, setAI_response] = useState("")

  useEffect(() => {
    if (!user || !budget || !expense) return

    const sumOfEachExpense = expense
      .filter((exp) => exp.userID == user.id)
      .reduce((acc, item) => {
        const exists = acc.find((row) => row.expBudgetID == item.budgetID)
        if (exists) {
          exists.expenseTotal += item.amount
          exists.allExpenses.push({
            name: item.name,
            amount: item.amount,
            date: item.date,
          })
        } else {
          acc.push({
            expBudgetID: item.budgetID,
            expenseTotal: item.amount,
            allExpenses: [
              {
                name: item.name,
                amount: item.amount,
                date: item.date,
              },
            ],
          })
        }
        return acc
      }, [])

    const combinedData = budget.reduce((acc, item) => {
      const exists = sumOfEachExpense.find((row) => row.expBudgetID == item.id)
      if (exists) {
        acc.push({
          budgetID: item.id,
          budgetName: item.name,
          budgetAmount: item.amount,
          allExpenses: exists.allExpenses,
          expenseTotal: exists.expenseTotal,
        })
      }
      return acc
    }, [])

    console.log("combined data for backend is " + JSON.stringify(combinedData))
    setBudgetStats(combinedData)
  }, [user, budget, expense])

  useEffect(() => {
    if (!budgetStats || budgetStats.length === 0) {
      console.log("budgetStats is empty, not sending to backend yet.")
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/ai/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(budgetStats),
        })

        const data = await response.json()
        console.log("data fetched from ai " + JSON.stringify(data))
        setAI_response(data)
      } catch (error) {
        console.error('Error fetching prediction:', error)
      }
    }

    fetchData()
  }, [budgetStats])

  return (
    <div>
      <div style={{ display: "none" }}>
        <input type="text" name="search" placeholder="search" onChange={(e) => setSearch(e.target.value)} />
        <input type="submit" name="submit" onClick={() => handleSearch()} />
      </div>
      <div style={{ display: "none" }}>
        {res === "" ? <LoadingSpinner /> : JSON.stringify(res)}
      </div>
      {userLoading || expenseLoading || budgetLoading ? (
        <LoadingSpinner />
      ) : AI_response === "" ? (
        <div
          style={{
            fontSize: "14px",
            display: "flex",
            gap: "10px",
            boxShadow: "2px 2px 30px rgb(10,10,10)",
            width: "100%",
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            It looks like you have neither expenses nor budgets,
            please insert new data to receive AI-insights...
          </div>
          <Icon iconStyle={iconStyle}>
            <LoadingSpinner />
          </Icon>
        </div>
      ) : (
        <Insights data={AI_response} stats={budgetStats} />
      )}
    </div>
  )
}

const iconStyle = {
  padding: "0px 5px",
  fontSize: "35px",
  color: "rgba(79, 8, 161, 0.76)",
}
