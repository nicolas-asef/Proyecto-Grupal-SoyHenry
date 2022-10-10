import Sidebar from "../../Sidebar/Sidebar";
import TableUserWorker from "../../Table/TableUserWorker";
import s from "./DashWorker.module.css"


export default function DashWorker (){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.table}>
                    <TableUserWorker name={"Worker"}/>
                </div>
            </div>
        </div>
    )
}