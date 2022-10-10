import Sidebar from "../../Sidebar/Sidebar";
import TableUserWorker from "../../Table/TableUserWorker";
import s from "./DashUsers.module.css"


export default function DashUsers (){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.table}>
                    <TableUserWorker name={"Users"} />
                </div>
            </div>
        </div>
    )
}