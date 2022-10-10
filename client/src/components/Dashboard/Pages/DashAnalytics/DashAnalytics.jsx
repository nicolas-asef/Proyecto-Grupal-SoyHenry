import ChartAnalytics from "../../Chart/ChartAnalytics"
import Sidebar from "../../Sidebar/Sidebar"
import s from "./DashAnalytics.module.css"

export default function DashAnalytics(){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.charts}>
                    <ChartAnalytics />
                </div>
            </div>
        </div>
    )
}