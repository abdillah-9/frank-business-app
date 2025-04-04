"use client"
import React, { createContext, useContext } from 'react'

const DashbordProvider = createContext();

export default function DashbordContainer({children, styleDashboard}){

    let demo = "demo"

  return (
    <div style={styleDashboard}>
        <DashbordProvider value={demo="demo"}>{children}</DashbordProvider>
    </div>
  )
}

//CHILDREN COMPONENTS
export function StatisticsContainer({children,styleStatsContainer}){
    const {demo} = useContext(DashbordProvider);

    return(
        <div style={styleStatsContainer}>
            {/* {demo} */}
            {children}
        </div>
    )
}

export function Statistic({children, styleStatistic, boxShadow="2px 3px 15px rgba(3, 179, 248, 0.93)"}){

    return(
        <div style={{...styleStatistic,boxShadow}}>
            {children}
        </div>
    )
}

export function StatisticGraph({children, styleStatisticGraph, 
    boxShadow="2px 3px 15px rgb(4, 55, 65)"}){

    return(
        <div style={{...styleStatisticGraph,boxShadow}}>
            {children}
        </div>
    )
}

export function StatisticIcon({children, styleStatIcon, backGrColor="rgba(13, 174, 248, 0.97)"}){

    return(
        <div style={{...styleStatIcon,backgroundColor:backGrColor}}>
            {children}
        </div>
    )
}

export function StatisticDesc({children, styleStatDesc}){

    return(
        <div style={styleStatDesc}>
            {children}
        </div>
    )
}

export function StatisticTitle({children, styleStatTitle}){

    return(
        <div style={styleStatTitle}>
            {children}
        </div>
    )
}

export function StatisticValue({children, styleStatValue}){

    return(
        <div style={styleStatValue}>
            {children}
        </div>
    )
}

//CREATE PROPS OF CHILD COMPONENTS TO THEIR PARENTS
DashbordContainer.StatisticsContainer = StatisticsContainer;
DashbordContainer.Statistic = Statistic;
DashbordContainer.StatisticGraph = StatisticGraph;
DashbordContainer.StatisticIcon = StatisticIcon;
DashbordContainer.StatisticDesc = StatisticDesc;
DashbordContainer.StatisticTitle = StatisticTitle;
DashbordContainer.StatisticValue = StatisticValue;

