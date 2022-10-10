import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Featured from '../Featured/Featured';
import s from "./ChartBalance.module.css"

const data = [
    {
    name: 'January ',
    premium: 300,
    },
    {
    name: 'February ',
    premium: 500,
    },
    {
    name: 'March ',
    premium: 750,
    },
    {
    name: 'April ',
    premium: 400,

    },
    {
    name: 'May',
    premium: 600,

    },
    {
    name: 'June',
    premium: 600,
    },
    {
    name: 'July',
    premium: 800,
    },
    {
    name: 'August',
    premium: 500,
    },
    {
    name: 'September',
    premium: 1000,
    },
    {
    name: 'Octuber',
    premium: 205,

    },
    {name: 'November',
    premium:0 
    },
    {
    name: 'December',
    premium:0 
    }
];

let profit = 0

for (let i = 0; i < data.length; i++) {
    profit += data[i].premium
}


export default function ChartBalance(){
    return (
        <div className={s.ChartBalance}>
            <div className={s.chart}>
                <ResponsiveContainer width={1200} height={400}>
                    <BarChart
                    width={500}
                    height={300}
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
            <div className={s.bottom}>
                <Featured />
                <div className={s.profit}>
                    <p className={s.p}>Total earnings: {profit * 4.99} USD</p>
                    <p className={s.p}>Total: $ {data[9].premium * 4.99} USD</p>
                </div>
            </div>
        </div>

    )
}

