import s from "./Chart.module.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, } from 'recharts';
import { useEffect } from "react";
import { getWorkers } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Chart (){

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
    },
    {
    name: 'December',
    }
    
];


    return (
        <div className={s.chart}>
            <h1 className={s.title}>Workers Premium (target = 5)</h1>
            <AreaChart width={1500} height={400} data={data}
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
            <ReferenceLine y={5} label="" stroke="red" />
            <Area type="monotone" dataKey="premium" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />            </AreaChart>
        </div>
    )
}