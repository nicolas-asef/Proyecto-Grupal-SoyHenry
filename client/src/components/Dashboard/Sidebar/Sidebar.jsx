import s from "./Sidebar.module.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Sidebar (){
    return (
        <div className={s.sidebar}>
            <div className={s.top}>
                <span className={s.logo}>PFHenry</span>
            </div>
            <div className={s.dashboard}>
                <h1>Dashboard</h1>
                <ul>
                    <li className={s.li}>
                        <DashboardIcon />
                        <span>Home</span>
                    </li>
                    <li className={s.li}>
                        <DashboardIcon />
                        <span>Analytics</span>
                    </li>
                    <li className={s.li}>
                        <DashboardIcon />
                        <span>Analytics</span>
                    </li>
                </ul>
            </div>
            <div className={s.center}>
                <ul className={s.ul}>
                    <li className={s.li}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <PeopleOutlineIcon />
                        <span>Users</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <AssessmentIcon />
                        <span>Stats</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <NotificationsNoneIcon />
                        <span>Notifications</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <SettingsIcon />
                        <span>Settings</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <AccountCircleIcon />
                        <span>Profile</span>
                    </li>
                </ul>
                <ul>
                    <li className={s.li}>
                        <LogoutIcon />
                        <span>Logout</span>
                    </li>
                </ul>
                
            </div>
            <div className={s.bottom}>
                Option
            </div>
        </div>
    )
}