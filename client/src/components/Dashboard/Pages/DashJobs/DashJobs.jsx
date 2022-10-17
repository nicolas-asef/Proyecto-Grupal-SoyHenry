import s from "./DashJob.module.css"
import Sidebar from "../../Sidebar/Sidebar"
import FormCreate from "../../Components/FormCrate/FormCreate"
import { useDispatch, useSelector } from 'react-redux';
import DashCountryTable from "../DashCountry/DashCountryTable";
import { useEffect, useState } from "react";
import { getJobs, postJob } from "../../../../redux/actions/actions";

export default function DashJobs(){
    const dispatch = useDispatch()
    const jobs = useSelector(state => state.jobs)
    const [actualizar, setActualizar] = useState(false)

    const search = (e) => {
        dispatch(postJob({"name": e}))
        setActualizar(actualizar === true ? false : true)
    }

    const render = (e) => {
        setActualizar(actualizar === true ? false : true)
    }

    useEffect(() => {
        dispatch(getJobs())
    },[actualizar])



    return (
        <div className={s.home}>
                <div className={s.divSidebar}>
                    <Sidebar />
                </div>
                <div className={s.homeContainer}>
                    <div className={s.country}>
                        <div className={s.top}>
                            <h1 className={s.title}>New Job</h1>
                            <FormCreate callbk={search}/>
                        </div>
                        <DashCountryTable array={jobs} select={"Job"} callbk={render}/>
                    </div>
                </div>
        </div>
    )
}