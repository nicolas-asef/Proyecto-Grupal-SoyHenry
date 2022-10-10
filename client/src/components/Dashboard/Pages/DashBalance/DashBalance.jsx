import ChartBalance from "../../Chart/ChartBalance"
import Featured from "../../Featured/Featured"
import Sidebar from "../../Sidebar/Sidebar"
import s from "./DashBalance.module.css"

export default function DashBalance(){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.charts}>
                    <ChartBalance />
                </div>
            </div>
        </div>
    )
}