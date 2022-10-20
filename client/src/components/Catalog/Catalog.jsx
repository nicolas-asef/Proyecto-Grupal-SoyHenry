import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import workersDB from "./workersdb.js";
import WorkerCard from "../WorkerCard/WorkerCard";
import Filters from "../Filters/Filters";

import Pagination from "@mui/material/Pagination";
import s from "./Catalog.module.css";

const Catalog = () => {
  const workers = useSelector((state) => state.workers); // el array de workers real sacado de redux (se utilizaría una vez que haya trabajadores en la base de datos)
  // const workers = workersDB;
  const [page, setPage] = useState(1);

  const lastIndex = page * 16;
  const firstIndex = lastIndex - 16; //0

  const numberPages = Math.ceil(workers.length / 16);

  let currentWorkers = workers.slice(firstIndex, lastIndex);

  const pagesNumber = (event, value) => {
    setPage(value);
  };
  return (
    <div className={s.OutterCardsDIV}>
      <div className={s.filterContainer}>
        <h1>Filtrar por: </h1>
        <Filters />
      </div>
      <div className={s.paginationContainer1}>
        <Pagination
          defaultPage={1}
          color="primary"
          count={numberPages}
          page={page}
          onChange={pagesNumber}
          shape="rounded"
        />
      </div>
      <div className={s.CardsDIV}>
        {currentWorkers.length === 0 ? (
          <div className={s.loader}>
            <div class={s.loaderCircularSquare}></div>
          </div>
        ) : (
          currentWorkers.map((worker) => (
            <div key={worker.User.ID} className={s.eachWorker}>
              <WorkerCard
                Worker={worker}
                User={worker.User}
                Jobs={worker.Jobs}
                Contracts={worker.Contracts}
                key={worker.User.ID}
              />
            </div>
          ))
        )}
      </div>

      <div className={s.paginationContainer2}>
        <Pagination
          defaultPage={1}
          color="primary"
          count={numberPages}
          page={page}
          onChange={pagesNumber}
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Catalog;
