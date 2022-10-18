import s from "./Sidebar.module.css"
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WorkIcon from '@mui/icons-material/Work';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "react-router-dom"


export default function Sidebar (){
    return (
        <div className={s.sidebar}>
            <div className={s.top}>
                <span className={s.logo}>PANEL ADMIN</span>
            </div>
            <div className={s.dashboard}>
                <h1 className={s.title}>Dashboard</h1>
                <ul>
                    <Link to='/dashboard'>
                        <li className={s.li}>
                            <HomeIcon />
                            <span>Home</span>
                        </li>
                    </Link>
                    <Link to='/dashboard/analytics'>
                        <li className={s.li}>
                            <TrendingUpIcon />
                            <span>Analytics</span>
                        </li>
                    </Link>
                    <Link to='/dashboard/balance'>
                        <li className={s.li}>
                            <TrendingUpIcon />
                            <span>Balance</span>
                        </li>
                    </Link>
                </ul>
                <h1 className={s.title}>Quick Menu</h1>
                <ul>
                    <Link to='/dashboard/users'>
                        <li className={s.li}>
                            <PersonOutlineIcon />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/dashboard/workers'>
                    <li className={s.li}>
                        <EngineeringIcon />
                        <span>Workers</span>
                    </li>
                    </Link>
                    <li className={s.li}>
                        <StarBorderIcon />
                        <span>Workrs Premium</span>
                    </li>
                    <li className={s.li}>
                        <BarChartIcon />
                        <span>Reports</span>
                    </li>
                </ul>
                    <h1 className={s.title}>Settings</h1>
                <ul>
                    <Link to='/dashboard/jobs'>
                        <li className={s.li}>
                            <WorkIcon />
                            <span>New Job</span>
                        </li>
                    </Link>
                    <Link to='/dashboard/country'>
                        <li className={s.li}>
                            <PublicIcon />
                            <span>New Country</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}