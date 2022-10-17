import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getJobs, getWorkers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import FooterS from "../Footer/Footer";

import Catalog from "../Catalog/Catalog";
import CardSlider from "../Showroom/CardSlider.jsx";
import img1 from "../../assets/fondoTrasnparente.png";

import s from "./Home.module.css";

const Home = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    dispatch(getWorkers());
  }, [dispatch]);

  return (
    <div className={s.all}>
      <div className={s.premiumContainer}>
        <div className={s.containerTitle}>Trabajadores Premium</div>
        <div className={s.carouselNew}>
          <CardSlider />
        </div>
      </div>
      <div className={s.titlesContainer}>
        <div className={s.catalogTilte}>
          <h1>Catalogo de trabajadores</h1>
        </div>
        <div className={s.containerSearchBar}>
          <SearchBar />
        </div>
      </div>
      <div className={s.containerCatalog}>
        <Catalog />
      </div>
      <div className={s.footer}>
        <FooterS />
      </div>
    </div>
  );
};

export default Home;
