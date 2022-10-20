import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import { getUsers, getWorkers } from "../../../redux/actions/actions";
import s from "./ChartAnalytics.module.css"
  
export default function ChartAnalytics(){
    const dispatch = useDispatch()
    const users = useSelector(state => state.onlyUser)
    const workers = useSelector(state => state.allWorkers)
    const workersPremium = workers.filter(worker => worker.premium === true)

    useEffect (() => {
        dispatch(getWorkers())
        dispatch(getUsers())
    },[])

    const data = [
        {
        name: 'January ',
        premium: 1,
        users: 12,
        workers: 4
        },
        {
        name: 'February ',
        premium: 3,
        users: 5,
        workers: 7,
        },
        {
        name: 'March ',
        premium: 2,
        users: 2,
        workers: 8,
        },
        {
        name: 'April ',
        premium: 2,
        users: 9,
        workers: 8,
        },
        {
        name: 'May',
        premium: 5,
        users: 8,
        workers: 15,
        },
        {
        name: 'June',
        premium: 7,
        users: 17,
        workers: 10
        },
        {
        name: 'July',
        premium: 4,
        users: 25,
        workers: 17
        },
        {
        name: 'August',
        premium: 5,
        users: 14,
        workers: 12,
        },
        {
        name: 'September',
        premium: 1,
        users: 12,
        workers: 19,
        },
        {
        name: 'Octuber',
        premium: workersPremium.length,
        users: users.length,
        workers: workers.length
        },
        {name: 'November'
        },
        {
        name: 'December'
        }
    ];
    return (
        <div>
            <div>
                <h1 className={s.title}>Workers - Users</h1>
                <AreaChart width={1500} height={350} data={data}
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
                <AreaChart width={1500} height={350} data={data}
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