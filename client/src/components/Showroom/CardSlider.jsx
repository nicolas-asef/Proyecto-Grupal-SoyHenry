import { useSelector } from "react-redux";
import { useState } from "react";

import info from "./data.js";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import style from "./CardSlider.module.css";

const CardSlider = () => {

  const workersState = useSelector((state) => state.workersPremium);
  const workers =  workersState.length < 8 ? info.examples : workersState;
  
  const workersPerPage = 8;

  const [position, setPosition] = useState(1);

  const lastWorker = position * workersPerPage;
  const firstWorker = lastWorker - workersPerPage;
  var workersToShow = workers.slice(firstWorker, lastWorker);  

  var quantity = workers.slice(lastWorker, workers.length);  

  const positionLess = function () {
    setTimeout(() => {
      setPosition(position < 2 ? position : position - 1);
    }, 500);
  };

  const positionMore = function () {
    setTimeout(() => {
      setPosition(quantity.length < 8 ? position : position + 1);
    }, 500);
  };

  return (
    <div className={style.container}>
      <div className={style.cardsContainer}>
        {workersToShow &&
          workersToShow.map((w) => {
            return (
              <div className={style.card}>
                <div className={style.imagen}>
                  <img src={w.User.img} alt="imagW" />
                </div>
                <div className={style.title}>
                  <h3>{w.User.name}</h3>
                </div>
                <div className={style.job1}>{<li> {w.Jobs[0].name}</li>}</div>
                <div className={style.rating}>
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={3}
                      precision={0.5}
                      readOnly
                    />{" "}
                    {/* CAMBIAR defaultValue=w.rating* Cuando haya DB con contratos hechos*/}
                  </Stack>
                </div>
                <div className={style.btn}>
                  <a
                    className={style.effect}
                    href={`http://localhost:3000/worker/${w.id}`}
                    title="View Profile"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.btns}>
        <div className={style.btnLeft}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={positionLess}>
              View Lesss
            </Button>
          </Stack>
        </div>
        <div className={style.btnRight}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={positionMore}>
              View More
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
