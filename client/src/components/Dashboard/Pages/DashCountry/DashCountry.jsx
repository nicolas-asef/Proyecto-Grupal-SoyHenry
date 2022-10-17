import s from "./DashCountry.module.css"
import Sidebar from "../../Sidebar/Sidebar"
import FormCreate from "../../Components/FormCrate/FormCreate"
import { useDispatch, useSelector } from 'react-redux';
import { get_countries, postCountry } from "../../../../redux/actions/actions";
import DashCountryTable from "./DashCountryTable";
import { useEffect, useState } from "react";


export default function DashCountry(){
    const dispatch = useDispatch()
    const countries = useSelector(state => state.allCountries)
    const [actualizar, setActualizar] = useState()

    const search = (e) => {
        dispatch(postCountry({"name": e}))
        setActualizar(actualizar === true ? false : true)
    }

    const render = (e) => {
        setActualizar(actualizar === true ? false : true)
    }

    useEffect(() => {
        dispatch(get_countries())
    },[actualizar])

    return (
        <div className={s.home}>
            <div className={s.divSidebar}>
                <Sidebar />
            </div>
            <div className={s.homeContainer}>
                <div className={s.country}>
                    <div className={s.top}>
                        <h1 className={s.title}>New Countries</h1>
                        <FormCreate callbk={search}/>
                    </div>
                    <DashCountryTable array={countries} select={"Country"} callbk={render}/>
                </div>
            </div>
        </div>
    )
}