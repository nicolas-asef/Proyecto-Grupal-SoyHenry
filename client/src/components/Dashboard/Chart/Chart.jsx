import s from "./Chart.module.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, } from 'recharts';

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
    },
    {
    name: 'December',
    }
    
];



export default function Chart (){
    return (
        <div className={s.chart}>
            <h1 className={s.title}>Workers Premium</h1>
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
            <ReferenceLine y={450} label="Target" stroke="red" />
            <Area type="monotone" dataKey="premium" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />            </AreaChart>
        </div>
    )
}