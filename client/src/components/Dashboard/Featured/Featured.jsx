import s from "./Featured.module.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PersonIcon from '@mui/icons-material/Person';

export default function Featured(){
    return (
        <div className={s.featured}>
            <div className={s.top}>
                <h1 className={s.title}>Premium workers target</h1>
            </div>
            <div className={s.bottom}>
                <div className={s.featuredChart}>
                    <CircularProgressbar value={45} text="45%" strokeWidth={8}/>
                </div>
                <p className={s.title}>Monthly goal</p>
                <div className={s.divObjective}>
                    <p className={s.objective}>450</p>
                    <PersonIcon className={s.icon}/>
                </div>
            </div>
        </div>
    )
}