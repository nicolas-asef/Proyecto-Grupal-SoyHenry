import Sidebar from "../../Sidebar/Sidebar";
import TableWorker from "./TableWorker";
import s from "./DashWorker.module.css"

export default function DashWorker (){

    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.table}>
                    <TableWorker />
                </div>
            </div>
        </div>
    )
}