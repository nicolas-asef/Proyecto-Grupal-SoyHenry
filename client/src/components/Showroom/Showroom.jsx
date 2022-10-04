import {useDispatch, useSelector} from 'react-redux';
import { useState,useEffect } from "react";
// import { PaginationSize } from ".../PaginationSize/PaginationSize"
import { CardWorkerShowroom } from "./CardWorkerShowroom"
import { Link } from "react-router-dom";


const ShowRoom = () => {
    let workers = useSelector((state) => state.workersPremium)
    //let users = useSelector((state) => state.users)
    const dispatch = useDispatch()
    
    // useEffect(()=>{
    //     dispatch(getWorkersPremium())
    // }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [workersPerPage, setWorkersPerPage] = useState(3);
    const endOfthePage = currentPage * workersPerPage;
    const indexOfFirstWorkerPage = endOfthePage - workersPerPage;
    const currentWorkers = workers.slice(indexOfFirstWorkerPage, endOfthePage);   

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div>
                {
                    currentWorkers.map((w) => {                     
                        return (
                            <Link key={`${w.id}`} to={`/workers/${w.id}`}>
                                <CardWorkerShowroom 
                                    key={w.id} 
                                    id={w.id}
                                    name={w.name}    
                                    lastName={w.lastName}                  
                                    img={w.img}
                                    jobs={w.jobs}
                                    rating_W={w.rating_W}
                                />                                
                            </Link>
                        )
                    })
                }
            </div>
            <div className="pagination-home">
                {/* <PaginationSize
                    workersPerPage={workersPerPage}
                    workers={workers.length}
                    paginado={paginado}
                /> */}
            </div>
        </div>
    )
}

export default ShowRoom;