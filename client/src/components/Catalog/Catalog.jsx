import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WorkerCard from "../WorkerCard/WorkerCard";
import s from "./Catalog.module.css";
import Pagination from '@mui/material/Pagination';

const Catalog = () => {
  const workers = useSelector((state) => state.workers); // el array de workers real sacado de redux (se utilizaría una vez que haya trabajadores en la base de datos)
  const allWorkers = useSelector((state) => state.allWorkers);

  const [page, setPage] = useState(1);

  const lastIndex = page * 4;
  const firstIndex = lastIndex - 4; //0

  const numberPages = Math.ceil((allWorkers.length/4))

  let currentWorkers = allWorkers.slice(firstIndex, lastIndex);

  const pagesNumber = (event, value) => {
    console.log(value)
    setPage(value);
  };

  return (
    <div className={s.OutterCardsDIV}>
      <div className={s.CardsDIV}>
        {workers.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          currentWorkers.map((worker) => (
            <div key={worker.ID}>
              <WorkerCard
                Worker={worker}
                User={worker.User}
                Jobs={worker.Jobs}
                Contracts={worker.Contracts}
              />
            </div>
          ))
        )}
        <div className={s.paginationContainer}>
            <Pagination defaultPage={1} color="primary" count={numberPages} page={page} onChange={pagesNumber} shape="rounded"/>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
