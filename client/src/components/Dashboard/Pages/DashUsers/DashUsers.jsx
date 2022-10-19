import TableUser from "./TableUser"
import Sidebar from "../../Sidebar/Sidebar";
import s from "./DashUsers.module.css"

export default function DashUsers (){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.table}>
                    <TableUser />
                </div>
            </div>
        </div>
    )
}