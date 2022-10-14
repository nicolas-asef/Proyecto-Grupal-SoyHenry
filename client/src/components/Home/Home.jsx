import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getJobs, getWorkers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import FooterS from "../Footer/Footer";
import Filters from "../Filters/Filters";
import Catalog from "../Catalog/Catalog";
import CardSlider from "../Showroom/CardSlider.jsx";

import s from "./Home.module.css";

const Home = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    dispatch(getWorkers());
  }, [dispatch]);

  return (
    <div className={s.all}>
      <div className={s.containerTitle}>Trabajadores Premium</div>
      <div className={s.carouselNew}>
        <CardSlider />
      </div>
      <div className={s.container}>
        <SearchBar />
      </div>
      <div className={s.filterContainer}>
        <Filters />
      </div>
      <div className={s.container}>
        <Catalog />
      </div>
      <FooterS />
    </div>
  );
};

export default Home;
