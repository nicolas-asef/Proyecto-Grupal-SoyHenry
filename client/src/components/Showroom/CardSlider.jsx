import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

import info from "./data.js";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import style from "./CardSlider.module.css";

const CardSlider = () => {
  const workersState = useSelector((state) => state.workersPremium);
  const workers = workersState.length < 5 ? info.examples : workersState;

  const workersPerPage = 5;

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
      setPosition(quantity.length < 5 ? position : position + 1);
    }, 500);
  };

  return (
    <div uk-slider="center: true">
      <div
        className="uk-position-relative uk-visible-toggle uk-dark"
        tabindex="-1"
      >
        <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-4@l uk-child-width-1-4@m uk-grid">
          <div className={style.containerCards}>
            {workersToShow.map((w, index) => {
              return (
                <li key={index}>
                  <div className="uk-panel">
                    <div className={style.boxContainer}>
                      <div className={!w ? style.cardLoader : style.card}>
                        <div className={style.face}>
                          <div className={style.front}>
                            <div className={style.spinnerIcon}></div>
                            <div
                              className={
                                !w.User.img ? style.spinnerIcon : style.pic
                              }
                            >
                              {!w ? null : (
                                <img src={w.User.img} alt="picProfile" />
                              )}
                            </div>
                            <div className={style.contentWorker}>
                              <h3 className={style.title}>
                                {w.User.name} {w.User.lastName}
                              </h3>
                              <span>{w.Jobs[0].name}</span>
                              <div className={style.rating}>
                                <Stack spacing={1}>
                                  <Rating
                                    name="read-only"
                                    defaultValue={3}
                                    precision={0.5}
                                    readOnly
                                  />{" "}
                                  {/* CAMBIAR defaultValue=w.rating* Cuando haya DB con contratos hechos*/}
                                </Stack>
                              </div>
                            </div>
                          </div>
                          <div className={style.back}>
                            <div className={style.social}>
                              <div className={style.state}>
                                {w.User.status ? (
                                  <a className={style.online}>Online</a>
                                ) : (
                                  <a className={style.disconnected}>
                                    Disconnected
                                  </a>
                                )}
                              </div>
                              {w.Contracts.comment_U ? (
                                w.Contracts.comment_U
                              ) : (
                                <p>
                                  " Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit. Perspiciatis provident eum
                                  reiciendis iste dicta. Ab non eaque quaerat
                                  neque nulla, natus illo nisi aliquam est earum
                                  facilis corporis ut in."
                                </p>
                              )}
                              <Link to={`/profile/${w.User.ID}`}>
                                <button>VER PERFIL</button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </ul>
        <div className={style.btns}>
          <div className={style.btnLeft}>
            <button variant="contained" onClick={positionLess}>
              View Lesss
            </button>
          </div>
          <div className={style.btnRight}>
            <button href="" variant="contained" onClick={positionMore}>
              View More
            </button>
          </div>
        </div>
        ;
      </div>
      <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
  );
};

export default CardSlider;
