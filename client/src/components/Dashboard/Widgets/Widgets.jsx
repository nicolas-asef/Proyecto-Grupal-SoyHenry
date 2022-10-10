import s from "./Widgets.module.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdjustIcon from '@mui/icons-material/Adjust';
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getWorkers } from "../../../redux/actions/actions";

export default function Widgets ({ type }){
    
    let data = {}
    
    if (type === 'users'){
        data = {
            title : "Users",
            counter: 4532,
            link: "See all users",
            icon: <KeyboardArrowUpIcon/>,
            porcentaje: "45 %",
            access: <PeopleAltIcon className={s.users}/>
        }
    }
    if (type === 'workers'){
        data = {
            title : "Workers",
            counter: 2843,
            link: "See all workers",
            icon: <KeyboardArrowUpIcon/>,
            porcentaje: "8 %",
            access: <EngineeringIcon className={s.workers}/>
        }
    }
    if (type === 'online'){
        data = {
            title : "Online",
            counter: 932,
            link: "Users online",
            icon: <CircleIcon className={s.circle}/>,
            porcentaje: "",
            access: <AdjustIcon className={s.online}/>
        }
    }
    if (type === 'premium'){
        data = {
            title : "Premium",
            counter: 1723,
            link: "Users premium",
            icon: <KeyboardArrowUpIcon/>,
            porcentaje: "30 %",
            access: <StarIcon className={s.premium}/>
        }
    }

    const dispatch = useDispatch()

    useEffect (() => {
        dispatch(getWorkers())
        dispatch(getUsers())
    },[])


    return (
        <div className={s.widgets}>
            <div className={s.left}>
                <span className={s.title}>{data.title}</span>
                <span className={s.counter}>{data.counter}</span>
                <span className={s.link}>{data.link}</span>
            </div>
            <div className={s.right}>
                <div className={s.porcentage}>
                    {data.icon}
                    {data.porcentaje}
                </div>
                <div className={s.access}>
                    {data.access}
                </div>
            </div>
        </div>
    )
}