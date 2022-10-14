import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux/actions/actions";
import TableUser from "./TableUser"
import Sidebar from "../../Sidebar/Sidebar";
import s from "./DashUsers.module.css"


export default function DashUsers (){

    const users = useSelector(state => state.newUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])

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