import s from "./Featured.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from "react";
import { getWorkers } from "../../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";


export default function Featured(){

    const dispatch = useDispatch()
    const workers = useSelector(state => state.allWorkers)
    const workersPremium = workers.filter(worker => worker.premium === true)
    
    useEffect (() => {
        dispatch(getWorkers())
    },[])

    const porcentaje = Math.ceil((workersPremium.length / 5) * 100)
    
    return (
        <div className={s.featured}>
            <div className={s.top}>
                <h1 className={s.title}>Premium workers target</h1>
            </div>
            <div className={s.bottom}>
                <div className={s.featuredChart}>
                    <CircularProgressbar value={porcentaje} text={`${porcentaje} %`} strokeWidth={8}/>
                </div>
                <p className={s.title}>Monthly goal</p>
                <div className={s.divObjective}>
                    <p className={s.objective}>5</p>
                    <PersonIcon className={s.icon}/>
                </div>
            </div>
        </div>
    )
}