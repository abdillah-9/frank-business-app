"use client"
import React, { useState, useEffect } from 'react';
import DashbordContainer, 
{ Statistic, StatisticDesc, StatisticGraph, StatisticIcon, StatisticsContainer, StatisticTitle }
  from './DashboardContainer';
import { GiReceiveMoney, GiPayMoney } from '@node_modules/react-icons/gi';
import DashboardFilter from './DashboardFilter';
import { getExpenditureData } from '@utils/apiExpenditure';
import { useQuery } from '@node_modules/@tanstack/react-query/build/legacy';
import { getTaskData } from '@utils/apiTasks';
import LoadingSpinner from '@app/UI components/LoadingSpinner';
import { BsMenuButtonFill, BsMenuButtonWideFill } from '@node_modules/react-icons/bs';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis }
  from '@node_modules/recharts';

export default function ManagerDashbord() {

  const [statsDuration, setStatsDuration] = useState("All");
  
  // State to hold stats
  const [stats, setStats] = useState({
    totalPendingTasks: 0,
    totalCompletedTasks: 0,
    totalExpenditureCost: 0,
    totalCompletedPayment: 0,
    tasksIsLoading: true,
    expenditureIsLoading: true,
    combinedData:[{}]
  });

  // Fetch expenditures
  const { isLoading: expenditureIsLoading, data: expenditureData } = useQuery({
    queryKey: ['expenditureData'],
    queryFn: getExpenditureData,
  });

  // Fetch tasks
  const { isLoading: tasksIsLoading, data: tasksData } = useQuery({
    queryKey: ['taskData'],
    queryFn: getTaskData,
  });

  useEffect(() => {
    if (tasksData && expenditureData) {
      if (statsDuration === "All") {
        const totalExpenditureCost = expenditureData?.reduce((total, item) => 
          total + (item.cost || 0), 0);
        const totalCompletedPayment = tasksData?.reduce((total, item) =>
           item.status === "completed" ? total + (parseFloat(item.payment) || 0) : total, 0);
        const totalCompletedTasks = tasksData?.reduce((total, item) =>
           item.status === "completed" ? total + 1 : total, 0);
        const totalPendingTasks = tasksData?.reduce((total, item) =>
           item.status === "pending" ? total + 1 : total, 0);

        setStats({
          totalPendingTasks,
          totalCompletedTasks,
          totalExpenditureCost,
          totalCompletedPayment,
          tasksIsLoading,
          expenditureIsLoading,
        });
      }

      if (statsDuration === "Current month") {
        //Get current date
        const currentDate = new Date();
        const currentMonthYearIso = currentDate.toISOString();
        const currentMonthYear = currentMonthYearIso.slice(0, 7); 

        //Total Expenditure Cost
        const totalExpenditureCost = expenditureData?.reduce((total, item) => {

          const itemMonthYear = item.date.slice(0,7);

          if (itemMonthYear == currentMonthYear) {
            return total + (item.cost || 0);  
          }
          return total; 
        }, 0); 
        
        //Total Completed payments
        const totalCompletedPayment = tasksData?.reduce((total, item) => {

          const itemMonthYear = item.startDate.slice(0,7);

          if (itemMonthYear == currentMonthYear && item.status == "completed") {
            return total + (parseFloat(item.payment) || 0);  
          }
          return total; 
        }, 0);

        //Total Completed Tasks
        const totalCompletedTasks = tasksData?.reduce((total, item) =>{ 

          const itemMonthYear = item.startDate.slice(0,7);  

          if(itemMonthYear == currentMonthYear && item.status == "completed"){
            return ++total
          }

          return total;
        }, 0);

        //Total Pending Tasks
        const totalPendingTasks = tasksData?.reduce((total, item) => {

          const itemMonthYear = item.startDate.slice(0,7);  

          if(itemMonthYear == currentMonthYear && item.status == "pending"){
            return ++total
          }

          return total;
        }, 0);

        setStats({
          totalPendingTasks,
          totalCompletedTasks,
          totalExpenditureCost,
          totalCompletedPayment,
          tasksIsLoading,
          expenditureIsLoading,
        });
      }
    }
  }, [statsDuration, tasksData, expenditureData, tasksIsLoading, expenditureIsLoading]);

  console.log("Tasks :"+JSON.stringify(tasksData));
  console.log("Expenditure :"+JSON.stringify(expenditureData));


//   // Format the data to be used in the chart
// const formattedData = expenditureData.map(item => ({
//   date: item.date, // Use date as x-axis
//   cost: item.cost  // Use cost as y-axis
// }));

// // Sort the data by date if needed
// formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

const rechartData = [
  {"id":5,"created_at":"2025-02-27T21:25:06.624915+00:00","description":"sdfjvhcfgdfxcgvjhbkj","date":"2025-02-24","cost":234,"income": 4000},
  {"id":6,"created_at":"2025-02-27T21:25:41.449589+00:00","description":"dfxgchvjbknl","date":"2025-01-27","cost":132,"income":7003},
  {"id":7,"created_at":"2025-02-27T21:26:26.377955+00:00","description":"szdfghj fghbjkn hjbknlm","date":"2025-02-03","cost":6787,"income":567},
  {"id":8,"created_at":"2025-03-23T11:43:28.223152+00:00","description":"i am testing mitamboz","date":"2025-03-25","cost":5700,"income":5678}
];

// COMBINE TASKS AND EXP DATA SO THAT TO BE USED IN THE SAME GRAPH
const joinedData = tasksData.map(task => {
  const expenditure = expenditureData.find(exp => exp.id === task.id);
  // Merge the task with the corresponding expenditure data
  return {
    ...task,
    expenditure: expenditure || {}  // In case there's no matching expenditure
  };
});

console.log("joined data is: "+JSON.stringify(joinedData));

// const combinedData = tasksData.map(task => {
//   // Find the corresponding expenditure entry based on id and created_at
//   const expenditure = expenditureData.find(exp => exp.id === task.id && exp.created_at === task.created_at);
  
//   // Return the data structure you want to use in the chart
//   return {
//     created_at: task.created_at, // Include created_at from task
//     startDate: task.startDate,
//     date: expenditure ? expenditure.date : task.startDate,  // Safely include date
//     cost: expenditure ? expenditure.cost : 0,  // Include cost from expenditureData
//     payment: task.payment,       // Include payment from task
//   };
// });

console.log("combined "+stats.combinedData)

  return (
    <div>
      <DashbordContainer styleDashboard={styleDashboard}>
        {/*********** STATISTICS CONTAINER FOR TITLE AND FILTER ****************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>
          <StatisticTitle styleStatTitle={styleStatTitle}>
            Dashboard
          </StatisticTitle>

          <DashboardFilter 
            setStatsDuration={setStatsDuration} 
            statsDuration={statsDuration}
          />
        </StatisticsContainer>

        {/*********** STATISTICS CONTAINER FOR STATS ****************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>

          <Statistic styleStatistic={styleStatistic} boxShadow='2px 3px 15px rgb(252, 84, 84)'>
            <StatisticIcon styleStatIcon={styleStatIcon}backGrColor={"rgb(252, 84, 84)"}> 
              <GiPayMoney/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Expenditures</div>
              <div style={styleValue}>
                {stats.expenditureIsLoading ? <LoadingSpinner /> : stats.totalExpenditureCost}
                <span style={{ fontSize: "16px" }}> TSh</span>
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic} boxShadow="2px 3px 15px rgb(241, 187, 7)">
            <StatisticIcon styleStatIcon={styleStatIcon} backGrColor={"rgb(241, 187, 7)"}> 
              <GiReceiveMoney/> 
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Income amount</div>
              <div style={styleValue}>
                {stats.tasksIsLoading ? <LoadingSpinner /> : stats.totalCompletedPayment}
                <span style={{ fontSize: "16px" }}> TSh</span>
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic} boxShadow='2px 3px 15px rgb(83,211,162)'>
            <StatisticIcon styleStatIcon={styleStatIcon} backGrColor={"rgb(83, 211, 162)"}> 
              <BsMenuButtonWideFill/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Completed tasks</div>
              <div style={styleValue}>
                {stats.tasksIsLoading ? <LoadingSpinner /> : stats.totalCompletedTasks}
              </div>
            </StatisticDesc>
          </Statistic>

          <Statistic styleStatistic={styleStatistic}>
            <StatisticIcon styleStatIcon={styleStatIcon}> 
              <BsMenuButtonFill/>
            </StatisticIcon>
            <StatisticDesc styleStatDesc={styleStatDesc}>
              <div style={styleName}>Ongoing tasks</div>
              <div style={styleValue}>
                {stats.tasksIsLoading ? <LoadingSpinner /> : stats.totalPendingTasks}
              </div>
            </StatisticDesc>
          </Statistic>
        </StatisticsContainer>

        {/*********** STATISTICS CONTAINER FOR CHARTS ****************/}
        <StatisticsContainer styleStatsContainer={styleStatsContainer}>

        <StatisticGraph styleStatisticGraph={styleStatisticGraph}>
          <h4 style={{fontWeight:500,fontSize:"20px"}}>EXPENDITURES PER DATE</h4>
          {
          (stats.tasksIsLoading || stats.expenditureIsLoading) ? <LoadingSpinner/> :

          <ResponsiveContainer height={350} width={"90%"}>  
          <AreaChart data={expenditureData} style={styleAreaChart}>
            <XAxis dataKey="date" style={styleXaxis}/>
            <YAxis unit={"Tsh"} style={styleYaxis}/>
            <Tooltip/>
            <defs>
              <linearGradient id="expenditure" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(37, 99, 107)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(37, 99, 107)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="tasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor="rgb(22, 131, 100)" stopOpacity={1}/>
                <stop offset="95%" stopColor="rgb(22, 131, 100)" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="cost" strokeWidth={3}
            stroke="rgba(130, 187, 240,0.5)" fill="url(#expenditure)" unit={"Tsh"} name="expenditure"
            style={{color:"black"}}
            />
            <Area type="monotone" dataKey="payment" strokeWidth={3}
            stroke="rgba(130, 187, 240,0.5)" fill="url(#tasks)" unit={"Tsh"} name="daily income"
            />
            <CartesianGrid strokeWidth={0.5} strokeDasharray={5}/>
          </AreaChart>
          </ResponsiveContainer>
          }
          </StatisticGraph>
        </StatisticsContainer>
      </DashbordContainer>
    </div>
  );
}

//Css Styles
const styleDashboard={
  backgroundColor:"rgba(252, 254, 255, 0.9)",
  height:"88vh",
  overflowY:"auto",
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
  //border:"1px solid red",
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