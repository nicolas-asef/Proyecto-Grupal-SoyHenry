import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkers } from "../../redux/actions/actions";
import CarruselWorkersPremium from "../CarruselWorkersPremium/CarruselWorkersPremium";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import s from "./HomePrueba.module.css";
import CardsWorkers from "../CardsWorkers/CardsWorkers";
import Footer from "../Footer/Footer";
import Pagination from "@mui/material/Pagination";

export default function HomePrueba() {
  let workers = useSelector((worker) => worker.workers);
  let newWorkers = workers.filter((worker) => worker.User.isDeleted === false);
  const dispatch = useDispatch();

  newWorkers.sort(function (a, b) {
    if (a.premium === true) {
      return -1;
    } else if (a.premium !== true) {
      return 1;
    }
  });

  const [page, setPage] = useState(1);
  const [titles, setTitles] = useState(false);

  const lastIndex = page * 10;
  const firstIndex = lastIndex - 10; //0

  const numberPages = Math.ceil(newWorkers.length / 10);

  let currentWorkers = newWorkers.slice(firstIndex, lastIndex);

  const pagesNumber = (event, value) => {
    setPage(value);
  };

  const callbk = () => {
    setPage(1)
  }

  useEffect(() => {
    dispatch(getWorkers());
  }, []);

  setTimeout(() => {
    if (titles === false) {
      setTitles(true);
    }
  }, 200);

  return (
    <div className={s.home}>
      <div className={s.perfil}></div>
      <div className={s.container}>
        <div className={s.carrusel}>
          <CarruselWorkersPremium />
        </div>
        <div className={s.search}>
          <SearchBar callbk={callbk} />
        </div>
        <div className={s.filters}>
          <Filters callbk={callbk} />
        </div>
        <div className={s.pagination}>
          <Pagination
            defaultPage={1}
            color="primary"
            count={numberPages}
            page={page}
            onChange={pagesNumber}
            shape="rounded"
          />
        </div>
        <div className={titles ? s.divWorker : s.divWorkerHidden}>
          <div className={s.workers}>
            {currentWorkers &&
              currentWorkers.map((worker) => {
                return (
                  <CardsWorkers
                    key={worker.ID}
                    id={worker.User.ID}
                    name={worker.User.name}
                    lastName={worker.User.lastName}
                    job={worker.Jobs[0].name}
                    country={worker.User.Country.name}
                    city={worker.User.city}
                    premium={worker.premium}
                    img={worker.User.img}
                  />
                );
              })}
          </div>
        </div>
        <div className={s.pagination}>
          <Pagination
            defaultPage={1}
            color="primary"
            count={numberPages}
            page={page}
            onChange={pagesNumber}
            shape="rounded"
          />
        </div>
        <div className={s.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
