import s from "./DashHome.module.css"
import Sidebar from "../../Sidebar/Sidebar";
import Widgets from "../../Widgets/Widgets";
import Chart from "../../Chart/Chart";
import BasicTable from "../../Table/Table";


export default function DashHome(){
    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.widgets}>
                    <Widgets type={"users"}/>
                    <Widgets type={"workers"}/>
                    <Widgets type={"online"}/>
                    <Widgets type={"premium"}/>
                </div>
                <div className={s.charts}>
                    <Chart />
                    {/* <Featured /> */}
                </div>
                {/* <div className={s.table}>
                    <BasicTable />
                </div> */}
            </div>
        </div>
    )
}