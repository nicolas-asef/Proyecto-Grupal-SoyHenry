import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Featured from '../Featured/Featured';
import { useEffect } from "react";
import { getWorkers } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./ChartBalance.module.css"



export default function ChartBalance(){

    const dispatch = useDispatch()
    const workers = useSelector(state => state.allWorkers)
    const workersPremium = workers.filter(worker => worker.premium === true)

    useEffect (() => {
        dispatch(getWorkers())
    },[])


    const data = [
        {
        name: 'January ',
        premium: 1,
        },
        {
        name: 'February ',
        premium: 3,
        },
        {
        name: 'March ',
        premium: 2,
        },
        {
        name: 'April ',
        premium: 2,
    
        },
        {
        name: 'May',
        premium: 5,
    
        },
        {
        name: 'June',
        premium: 7,
        },
        {
        name: 'July',
        premium: 4,
        },
        {
        name: 'August',
        premium: 5,
        },
        {
        name: 'September',
        premium: 1,
        },
        {
        name: 'Octuber',
        premium: workersPremium.length,
    
        },
        {name: 'November',
        premium:0 
        },
        {
        name: 'December',
        premium:0 
        }
    ];

    return (
        <div className={s.ChartBalance}>
            <div className={s.bottom}>
                <Featured />
            </div>
            <div className={s.chart}>
                <ResponsiveContainer width={1200} height={350}>
                    <BarChart
                    width={500}
                    height={250}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="premium" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>  
            </div>
        </div>

    )
}

