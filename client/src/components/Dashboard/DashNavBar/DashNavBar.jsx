import s from "./DashNavBar.module.css"
import SearchIcon from '@mui/icons-material/Search';

export default function DashNavBar(){
    return (
        <div className={s.navbar}>
            <div className={s.wrapper}>
                <div className={s.search}>
                    <input type="text" placeholder="Search..." />
                    <SearchIcon />
                </div>
            </div>
        </div>
    )
}