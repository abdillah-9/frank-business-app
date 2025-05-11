"use client"
import React, { useState, useEffect } from 'react';
import DashbordContainer, 
{ Statistic, StatisticDesc, StatisticGraph, StatisticIcon, StatisticsContainer, StatisticTitle }
  from './DashboardContainer';
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from '@node_modules/react-icons/gi';
import DashboardFilter from './DashboardFilter';
import { getExpenseData } from '@utils/apiExpense';
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';
import { getBudgetData } from '@utils/apiBudget';
import LoadingSpinner from '@app/reusables/UI_components/LoadingSpinner';
import { BsMenuButtonFill, BsMenuButtonWideFill } from '@node_modules/react-icons/bs';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis }
  from '@node_modules/recharts';

export default function ManagerDashbord({user, statsDuration, setStatsDuration}) {
  let active = "rgb(83, 211, 162)";
  let upcoming = "rgba(13, 174, 248, 0.97)";
  let expired = "rgb(252, 84, 84)";
  
  // State to hold stats
  const [stats, setStats] = useState({
    totalBudgetsNotExceeded:0,
    totalBudgetsExceeded: 0,
    totalActiveBudget: 0,
    totalConfirmedExpenses: 0,
    expenseIsLoading: true,
    budgetIsLoading: true,
    combinedData:[{}],
    budgetChartData:[],
    expenseChartData:[],
  });

  // Fetch expense
  const { isLoading: expenseIsLoading, data: expenseData } = useQuery({
    queryKey: ['expenseData'],
    queryFn: getExpenseData,
  });

  // Fetch tasks
  const { isLoading: budgetIsLoading, data: budgetData } = useQuery({
    queryKey: ['budgetData'],
    queryFn: getBudgetData,
  });

  //calculate total expense for each budget
  let expenseTotalById="";
  if(expenseData){
    expenseTotalById = expenseData.filter((expenseRow)=>expenseRow.userID === user.id).reduce(
      (acc, expenseData)=>{
        if(!acc[expenseData.budgetID]){ acc[expenseData.budgetID] = 0 }
        acc[expenseData.budgetID]+= expenseData.amount
        return acc
      },{}
    )
  }

  useEffect(() => {
    if (budgetData && expenseData) {
      console.log("budgetData is "+JSON.stringify(budgetData))
      if (statsDuration === "All") {
        const totalActiveBudget = budgetData?.filter((row)=>row.userID === user.id)
        .reduce((total, item) => 
          item.status === "active" ? total + (item.amount || 0) : total, 0);
        const totalConfirmedExpenses = expenseData?.filter((row)=>row.userID === user.id)
        .reduce((total, item) =>
           item.status === "confirmed" ? total + (parseFloat(item.amount) || 0) : total, 0);

      const expenseTotalByBudget = expenseData
      .filter(item => item.status === "confirmed" && item.userID === user.id)
      .reduce((acc, expenseData) => {
        if (!acc[expenseData.budgetID]) acc[expenseData.budgetID] = 0;
        acc[expenseData.budgetID] += parseFloat(expenseData.amount) || 0;
        return acc;
      }, {});

      //Count budgets exceeded vs not exceeded
      let budgetsExceeded=0;
      let budgetsNotExceeded=0;
      budgetData.filter((row)=>row.userID == user.id && row.status == "active")
      .forEach(budget => {
      const budgetAmount = parseFloat(budget.amount) || 0;
      const spent = expenseTotalByBudget[budget.id] || 0;

      if (spent > budgetAmount) {
        budgetsExceeded++;
      } else {
        budgetsNotExceeded++;
      }})

        //budgetChartData
        let budgetChartData = [...budgetData]
        .filter(exp => exp.userID === user.id)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        //create expenseChartData
        let expenseChartData = [...expenseData].filter((row)=>row.userID == user.id)
        .sort((a,b)=> new Date(a.date) - new Date(b.date))
        .map(row => ({
          ...row,
          date: new Date(row.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }).slice(0, 7)
        }))

        console.log("expense cahrt data "+JSON.stringify(expenseChartData))
        //Calculate combineddata
        let sortedCombinedData = [...expenseData]
        .filter(exp => exp.userID === user.id)
        .sort((a, b) => new Date(a.date) - new Date(b.date));  

        setStats({
          totalBudgetsNotExceeded:budgetsNotExceeded,
          totalBudgetsExceeded:budgetsExceeded,
          totalActiveBudget,
          totalConfirmedExpenses,
          expenseIsLoading,
          budgetIsLoading,
          combinedData:sortedCombinedData,
          budgetChartData,
          expenseChartData,
        });
      }

      if (statsDuration == "Current month") {
        //Get current date
        const currentDate = new Date();
        const currentMonthYearIso = currentDate.toISOString();
        const currentMonthYear = currentMonthYearIso.slice(0, 7); 

        //Total active budgets
        const totalActiveBudget = budgetData?.filter((budgetRow)=>budgetRow.userID == user.id)
        .reduce((total, item) => {
          const itemMonthYear = item.startDate.slice(0,7);

          console.log("ItemMonthYear is"+itemMonthYear);
          console.log("currentMonthYear is"+currentMonthYear);

          if (itemMonthYear == currentMonthYear) {
            return total + (item.amount || 0);  
          }
          return total; 
        }, 0); 

        console.log("Total expenditure cost"+totalActiveBudget);
        
        //Total Confrmed expenses
        const totalConfirmedExpenses = expenseData?.filter((row)=>row.userID == user.id)
        .reduce((total, item) => {

          const itemMonthYear = item.date.slice(0,7);

          if (itemMonthYear == currentMonthYear && item.status == "confirmed") {
            return total + (parseFloat(item.amount) || 0);  
          }
          return total; 
        }, 0);

        //get number of exceeded and not exceeded budgets
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const expenseTotalByBudget = expenseData
          .filter(item => {
          const itemDate = new Date(item.date); 
          return (
            item.status === "confirmed" &&
            item.userID === user.id &&
            item.date.slice(0,7) == currentMonthYear
          );
        }).reduce((acc, expenseData) => {
            if (!acc[expenseData.budgetID]) acc[expenseData.budgetID] = 0;
            acc[expenseData.budgetID] += parseFloat(expenseData.amount) || 0;
            return acc;
        }, {});
      // Now end it -> count budgets exceeded vs not exceeded
      let budgetsExceeded=0;
      let budgetsNotExceeded=0;
      budgetData.filter((row)=>row.userID == user.id && row.status == "active")
      .forEach(budget => {
      const budgetAmount = parseFloat(budget.amount) || 0;
      const spent = expenseTotalByBudget[budget.id] || 0;

      if (spent > budgetAmount) {
        budgetsExceeded++;
      } else {
        budgetsNotExceeded++;
      }})


        //budgewtChartData
        let budgetChartData = [...budgetData]
        .filter(exp => exp.userID === user.id)
        .filter(exp => exp.startDate.slice(0, 7) === currentMonthYear)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        //create expenseChartData
        let expenseChartData = [...expenseData].
        filter((row)=>row.userID == user.id)
        .filter(exp => exp.date.slice(0, 7) === currentMonthYear)
        .sort((a,b)=> new Date(a.date) - new Date(b.date))
        .map(row => ({
          ...row,
          date: new Date(row.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }).slice(0, 7)
        }))

        //Calculate combineddata
        let sortedCombinedData = [...expenseData]
        .filter(exp => exp.userID === user.id)
        .filter(exp => exp.date.slice(0, 7) === currentMonthYear)
        .sort((a, b) => new Date(a.date) - new Date(b.date));      

        setStats({
          totalBudgetsNotExceeded:budgetsNotExceeded,
          totalBudgetsExceeded:budgetsExceeded,
          totalActiveBudget,
          totalConfirmedExpenses,
          expenseIsLoading,
          budgetIsLoading,
          combinedData:sortedCombinedData,
          budgetChartData,
          expenseChartData,
        });
      }
    }
  }, [statsDuration, budgetData, expenseData, expenseIsLoading, budgetIsLoading]);


  //pieChart data
  const pieChartData = stats.budgetChartData?.
    reduce((acc,item)=>{
      const status = item.status;
      const id = item.id;
      const amount = item.amount || 0;
      const startDate = item.startDate;

      //explanations needed
      const existing = acc.find((entry) => entry.status === status);
      if (existing) {
        existing.total += amount;
      } else {
        acc.push({ id, status, total: amount, startDate });
      }

    return acc
    },[]
    );

  const areaChartData = Object.values(
    stats.combinedData.reduce((acc, item) => {
      
      const { date, amount, status } = item;
      console.log("date passed is"+date);

      const validDate = new Date(date);
      //const isoDate = validDate.toISOString().slice(0,10);
      const localeDate = validDate.toLocaleDateString("en-US",{
        month:"short",
        day:"numeric",
      });      
      
      if (!acc[localeDate]) {
        acc[localeDate] = {
          date: localeDate,
          confirmedAmount: 0,
          unconfirmedAmount: 0
        };
      }

      if (status === 'confirmed') {
        acc[localeDate].confirmedAmount += amount;
      } else if (status === 'unConfirmed') {
        acc[localeDate].unconfirmedAmount += amount;
      }
  
      return acc;
    }, {})
  );

  //barChartData
  let barChartData;
  let total=0;
  budgetData && expenseData ? barChartData = stats.expenseChartData.filter((row)=>row.status == "confirmed")
  .reduce((acc,item)=>{
    let amount = item.amount;
    let budgetID = item.budgetID;
    let date = item.date;
    //let = item.amount;
    let existing = acc.find((entry)=> entry.budgetID == budgetID)
    let matchingID = budgetData.find((row)=> row.id == budgetID)

    if (!matchingID) return acc; 
    if(existing){
      existing.total += amount;
    }
    else{
      acc.push({ total: amount,budgetID,budgetName: matchingID.name,
      budgetAmount:matchingID.amount, date})
    }

    return acc
  }, [])
  :""
  barChartData? console.log("Bar chart data "+JSON.stringify(barChartData)):"";

  return (
    <div>
      <DashbordContainer styleDashboard={styleDashboard}>
        {/*********** STATISTICS CONTAINER FOR STATS ****************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>

          <Statistic styleStatistic={styleStatistic} boxShadow='2px 3px 15px rgb(252, 84, 84)'>
            <StatisticIcon styleStatIcon={styleStatIcon}backGrColor={"rgb(252, 84, 84)"}> 
              <GiTakeMyMoney />
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Total active budgets</div>
              <div style={styleValue}>
                {stats.budgetIsLoading ? <LoadingSpinner /> : stats.totalActiveBudget}
                <span style={{ fontSize: "16px" }}> TSh</span>
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic} boxShadow="2px 3px 15px rgb(241, 187, 7)">
            <StatisticIcon styleStatIcon={styleStatIcon} backGrColor={"rgb(241, 187, 7)"}> 
              <GiPayMoney/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Total confirmed expenses</div>
              <div style={styleValue}>
                {stats.expenseIsLoading ? <LoadingSpinner /> : stats.totalConfirmedExpenses}
               <span style={{ fontSize: "16px" }}> TSh</span>
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic} boxShadow='2px 3px 15px rgb(83,211,162)'>
            <StatisticIcon styleStatIcon={styleStatIcon} backGrColor={"rgb(83, 211, 162)"}> 
              <BsMenuButtonWideFill/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Active budgets</div>
              <div style={styleValue}>
                {stats.budgetIsLoading ? <LoadingSpinner /> :
                 stats.totalBudgetsExceeded+stats.totalBudgetsNotExceeded}
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic}>
            <StatisticIcon styleStatIcon={styleStatIcon}> 
              <BsMenuButtonFill/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Exceeded budgets</div>
              <div style={styleValue}>
                {stats.budgetIsLoading ? <LoadingSpinner /> : stats.totalBudgetsExceeded}
              </div>
            </StatisticDesc>
          </Statistic>
        </StatisticsContainer>

        {/********************************* PIE CHART ********************************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>
          {
            pieChartData? console.log("Pie chart data "+JSON.stringify(pieChartData)) :""
          }
          {
            pieChartData !="" && pieChartData != undefined ?
          <div style={pieChartStyle}>   
          <ResponsiveContainer width={"100%"} height={240}>
            <PieChart>
              <Pie  
                data={pieChartData} 
                nameKey={'status'} 
                dataKey={'total'} 
                innerRadius={30} 
                outerRadius={90}
                cx={"33%"}
                cy={"50%"}
                paddingAngle={1.5}
              >
                {
                  pieChartData.map((row)=>
                    <Cell
                      fill={row.status == "expired" && expired || 
                      row.status == "upcoming" && upcoming||
                      row.status == "active" && active}
                      stroke={""}
                      key={row.id}
                />
                )
                }
              </Pie>
              <Legend 
              align='right'
                verticalAlign='middle'
                width={100}
                fontSize={"20px"}
                layout='verticle'
                iconSize={12}
                iconType='circle'/>
            </PieChart>
          </ResponsiveContainer>  
          </div>
          :""
          }
          <div style={pieChartDescStyle}>
            {
              pieChartData !="" && pieChartData != undefined ?
              <h4 style={{fontWeight:500,fontSize:"17px", textAlign:"center",width:"500px"}}>
                Total budgets from {pieChartData[0].startDate} to {pieChartData[pieChartData.length - 1].startDate}
              </h4>: <h4></h4>
            }
            <div key={Math.random()} 
              style={{display:"flex",gap:"20px"}}>
            {
              pieChartData !="" && pieChartData != undefined ?
              pieChartData.map((row)=> 
                <div style={pieChartDescStatsStyle} key={row.id}>
                  <div style={{...pieStatsStyle,backgroundColor: row.status == "active" ? 
                  active: row.status == "upcoming"  ? upcoming: row.status == "expired" && expired}}>
                    {row.status}</div>
                  <div style={{...pieStatsStyle, borderBottom:"5px solid",
                    borderBottomColor:row.status == "active" ? 
                    active: row.status == "upcoming"  ? upcoming: row.status == "expired" && expired
                  }}>{row.total} Tsh</div>
                </div>
              ) 
              :""
            }
            </div>
          </div>
        </StatisticsContainer>
        {/********************************* AREA CHART ********************************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>
        <StatisticGraph styleStatisticGraph={styleStatisticGraph}>
          {
            areaChartData !="" && areaChartData != undefined ?
            <h4 style={{fontWeight:500,fontSize:"17px"}}>
            Expenses from {areaChartData[0].date} to {areaChartData[areaChartData.length - 1].date}</h4>
            :""
          }

          {
          (stats.expenseIsLoading || stats.budgetIsLoading) ? <LoadingSpinner/> :
          <ResponsiveContainer height={300} width={"90%"}>  
          <AreaChart data={areaChartData} style={styleAreaChart}>
            <XAxis dataKey="date" style={styleXaxis}/>
            <YAxis unit={"Tsh"} style={styleYaxis}/>
            <Tooltip/>
            <defs>
              <linearGradient id="unconfirmedExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(54, 208, 4)" stopOpacity={1}/>
                <stop offset="95%" stopColor="rgb(54, 208, 4)" stopOpacity={0.5}/>
              </linearGradient>
              <linearGradient id="confirmedExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="rgba(6, 72, 152, 0.86)" stopOpacity={1}/>
                <stop offset="95%" stopColor="rgba(6, 72, 152, 0.86)" stopOpacity={0.5}/>
              </linearGradient>
            </defs>

            <Area type="monotone" dataKey="unconfirmedAmount" strokeWidth={1}
            stroke="rgb(54, 208, 4)" fill="url(#unconfirmedExpense)" unit={"Tsh"} name="un-confirmed amount"
            />
            <Area type="monotone" dataKey="confirmedAmount" strokeWidth={1}
            stroke="rgba(6, 72, 152, 0.86)" fill="url(#confirmedExpense)" unit={"Tsh"} name="confirmed amount"
            />

            <CartesianGrid strokeWidth={0.5} strokeDasharray={5}/>
          </AreaChart>
          </ResponsiveContainer>
          }
          </StatisticGraph>
        </StatisticsContainer>
        {/************************************** BAR GRAPH ********************************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>
        <div style={barChartDesc}>
          {
            barChartData !="" && barChartData != undefined ?
            <h4 style={{fontWeight:500,fontSize:"15px"}}>
            Expenses VS Budgets from {barChartData[0].date} to {barChartData[barChartData.length - 1].date}</h4>
            :""
          }
          {
            barChartData?.map((row)=>
              <div key={row.budgetID} style={barChildDesc}>
                {row.budgetName} budget :<div style={barBudget}> {row.budgetAmount} Tsh</div>
                Total expense :<div style={barTotalExpense}> {row.total} Tsh</div>
              </div>
            )
          }
        </div>  
        <BarChart width={730} height={450} data={barChartData} style={barChartStyle}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="budgetName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill={active} />
          <Bar dataKey="budgetAmount" fill={upcoming} />
        </BarChart>
        </StatisticsContainer>
      </DashbordContainer>
    </div>
  );
}

//Css Styles
const styleDashboard={
  backgroundColor:"rgba(252, 254, 255, 0.9)",
  //backgroundColor:"rgb(235,235,235)",
  height:"77vh",
  overflowY:"auto",
  padding:"20px 0px",
  boxShadow:"2px 2px 10px rgba(20,20,20,0.3)",
}

const styleStatsContainer={
  display:"flex",
  flexDirection:"row",
  flexWrap:"wrap",
  gap:"10px",
  justifyContent:"space-between",
  justifySelf:"center",
  width:"90%",
  padding:"13px 0px",
}
const pieChartStyle={
  //backgroundColor:"rgb(235,235,235)",
  boxShadow:"2px 2px 20px rgba(20,20,20,0.5)",
  minWidth:"350px",
  width:"35%",
  display:"flex",
  flexDirection:"column",
  padding:"20px 10px"
}
const barChartStyle={
  //backgroundColor:"rgb(235,235,235)",
  boxShadow:"2px 2px 20px rgba(20,20,20,0.5)",
  minWidth:"350px",
  width:"60%",
  display:"flex",
  flexDirection:"column",
  padding:"20px 10px"
}
const barChartDesc={
  //backgroundColor:"rgb(235,235,235)",
  boxShadow:"2px 2px 20px rgba(20,20,20,0.5)",
  fontWeight:500,
  gap:"20px",
  minWidth:"350px",
  width:"37%",
  maxHeight:"500px",
  display:"flex",
  flexDirection:"column",
  padding:"20px",
  overflow:"auto",
}
const barChildDesc={
  padding:"20px 10px",
  borderBottom:"3px solid rgb(252, 84, 84)",
  display:"flex",
  flexDirection:"column",
  gap:"20px",
}
const barBudget={
  backgroundColor: "rgba(13, 174, 248, 0.97)",
  padding:"15px",
}
const barTotalExpense={
  backgroundColor: "rgb(83, 211, 162)",
  padding:"15px",
}
const pieChartDescStyle={
  boxShadow:"2px 2px 20px rgba(20,20,20,0.5)",
  minWidth:"350px",
  width:"60%",
  display:"flex",
  flexDirection:"column",
  height:"240px",
  padding:"20px 10px",
  gap:"20px",
}
const pieChartDescStatsStyle={
  display:"flex",
  flexDirection:"column",
  gap:"20px",
  width:"100%",
}
const pieStatsStyle={
  padding:"15px",
  fontWeight:500,
}

const styleStatistic={
  display:"flex",
  flexDirection:"row",
  alignItems:"space-evenly",
  justifyContent:"center",
  gap:"10px",
  padding:"10px",
  height:"fit-content",
  width:"80%",
  maxWidth:"180px",
}

const styleStatisticGraph={
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  gap:"20px",
  width:"100%",
  minWidth:"350px",
  padding:"20px 0px",
  marginTop:"20px",
}

const styleStatIcon={
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontSize:"23px",
  borderRadius:"50%",
  padding:"10px",
  height:"50px",
  width:"50px",
}

const styleStatDesc={
  display:"flex",
  flexDirection:"column",
  gap:"2px",
  textAlign:"center"
}

const styleStatTitle={
  fontSize:"20px",
  fontWeight:"500",
}

const styleName ={
  fontSize:"12px",
}

const styleValue ={
  fontSize:"20px",
  fontWeight:"400",
}

const styleAreaChart ={
  backgroundColor:"rgba(100,100,100,0.0)",
}
const styleXaxis ={
  fontSize:"12px",
  
}
const styleYaxis ={
  fontSize:"12px",
  
}