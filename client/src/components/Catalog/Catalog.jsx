import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import workersDB from "./workersdb.js";
import WorkerCard from "../WorkerCard/WorkerCard";

import Pagination from "@mui/material/Pagination";
import s from "./Catalog.module.css";

const Catalog = () => {
  // const workers = useSelector((state) => state.workers); // el array de workers real sacado de redux (se utilizaría una vez que haya trabajadores en la base de datos)
  const workers = workersDB;
  console.log(workers)

  const [page, setPage] = useState(1);

  const lastIndex = page * 4;
  const firstIndex = lastIndex - 4; //0

  const numberPages = Math.ceil(workers.length / 4);

  let currentWorkers = workers.slice(firstIndex, lastIndex);

  const pagesNumber = (event, value) => {
    setPage(value);
  };

  return (
    <div className={s.OutterCardsDIV}>
      <div className={s.CardsDIV}>
        {currentWorkers.length === 0 ? (
          <h1>Loading...</h1>
        ) : (
          currentWorkers.map((worker) => (
            <div key={worker.User.ID}>
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
    </div>
  );
};

export default Catalog;
