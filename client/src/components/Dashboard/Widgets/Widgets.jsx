import s from "./Widgets.module.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AdjustIcon from '@mui/icons-material/Adjust';
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getWorkers } from "../../../redux/actions/actions";

export default function Widgets ({ type }){
    

    const dispatch = useDispatch()
    const users = useSelector(state => state.onlyUser)
    const workers = useSelector(state => state.allWorkers)
    const online = useSelector(state => state.newUser)
    const workersPremium = workers.filter(worker => worker.premium === true)
    const allOnline = online.filter(online => online.isOnline === true)

    useEffect (() => {
        dispatch(getWorkers())
        dispatch(getUsers())
    },[])
    
    let userCount = 15
    let workerCount = 15
    let workerPremiumCount = 5
    let onlineCount = 2
    
    let data = {}
    
    if (type === 'users'){
        data = {
            title : "Users",
            counter: users.length,
            link: "See all users",
            porcentaje: Math.ceil((users.length / userCount)*100) - 100,
            access: <PeopleAltIcon className={s.users}/>
        }    
    }    
    if (type === 'workers'){
        data = {
            title : "Workers",
            counter: workers.length,
            link: "See all workers",
            porcentaje:  Math.ceil((workers.length / workerCount)*100) - 100,
            access: <EngineeringIcon className={s.workers}/>
        }    
    }    
    if (type === 'online'){
        data = {
            title : "Online",
            counter: allOnline.length,
            link: "Users online",
            porcentaje:  Math.ceil((allOnline.length / onlineCount)*100) - 100,
            access: <AdjustIcon className={s.online}/>
        }    
    }    
    if (type === 'premium'){
        data = {
            title : "Premium",
            counter: workersPremium.length,
            link: "Users premium",
            porcentaje: Math.ceil((workersPremium.length / workerPremiumCount)*100) - 100,
            access: <StarIcon className={s.premium}/>
        }    
    }        

    return (
        <div className={s.widgets}>
            <div className={s.left}>
                <span className={s.title}>{data.title}</span>
                <span className={s.counter}>{data.counter}</span>
                <span className={s.link}>{data.link}</span>
            </div>
            <div className={s.right}>
                <div className={s.porcentage}>
                {
                    data.porcentaje >= 0
                    ? <div className={s.porcentage}>
                        <KeyboardArrowUpIcon />
                        {data.porcentaje} %
                    </ div> 
                    : <div className={s.porcentageNeg}>
                         <KeyboardArrowDownIcon />
                        {data.porcentaje} %
                    </ div> 
                }
                </div>
                <div className={s.access}>
                    {data.access}
                </div>
            </div>
        </div>
    )
}