import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import s from "./ChartAnalytics.module.css"


const data = [
    {
    name: 'January ',
    premium: 300,
    users: 2000,
    workers: 1000
    },
    {
    name: 'February ',
    premium: 500,
    users: 2432,
    workers: 1400,
    },
    {
    name: 'March ',
    premium: 750,
    users: 1200,
    workers: 2000,
    },
    {
    name: 'April ',
    premium: 400,
    users: 4000,
    workers: 900,
    },
    {
    name: 'May',
    premium: 600,
    users: 7200,
    workers: 4000,
    },
    {
    name: 'June',
    premium: 600,
    users: 8000,
    workers: 4000
    },
    {
    name: 'July',
    premium: 800,
    users: 4500,
    workers: 7400
    },
    {
    name: 'August',
    premium: 500,
    users: 4500,
    workers: 2000,
    },
    {
    name: 'September',
    premium: 1000,
    users: 6000,
    workers: 1800,
    },
    {
    name: 'Octuber',
    premium: 205,
    users: 1400,
    workers: 1200
    },
    {name: 'November',
    },
    {
    name: 'December',
    }
];
  
export default function ChartAnalytics(){
    return (
        <div>
            <div>
                <h1 className={s.title}>Workers - Users</h1>
                <AreaChart width={1600} height={400} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="workers" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="users" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </div>
            <div>
                <h1 className={s.title}>Workers - Workers Premium</h1>
                <AreaChart width={1600} height={400} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="workers" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="premium" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
            </div>
        </div>
        
    )
}            