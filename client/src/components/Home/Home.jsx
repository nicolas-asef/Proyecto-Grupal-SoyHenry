import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getJobs, getWorkers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

import FooterS from "../Footer/Footer";

import Catalog from "../Catalog/Catalog";
import CardSlider from "../Showroom/CardSlider.jsx";

import s from "./Home.module.css";

const Home = () => {
  let dispatch = useDispatch();
  const [titles, setTitles] = useState(false);

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getWorkers());
  }, [dispatch]);

  const hidenTitles = () => {
    if (window.scrollY >= 250) {
      setTitles(true);
    } else {
      setTitles(false);
    }
  };

  const hidenCatalog = () => {
    if (window.scrollY >= 875) {
      setTitles(true);
    } else {
      setTitles(false);
    }
  };

  window.addEventListener("scroll", hidenTitles, hidenCatalog);

  return (
    <div className={s.all}>
      <div className={s.premiumContainer}>
        <div className={s.containerTitle}>Trabajadores Premium</div>
        <div className={s.carouselNew}>
          <CardSlider />
        </div>
      </div>
      <div className={titles ? s.titlesContainer : s.titlesContainerHidden}>
        <div className={s.catalogTilte}>
          <h1>Catalogo de trabajadores</h1>
        </div>
        <div className={s.containerSearchBar}>
          <SearchBar id="searchBar" />
        </div>
      </div>
      <div className={titles ? s.containerCatalog : s.containerCatalogHidden}>
        <Catalog id="catalogo" />
      </div>
      <div className={s.footer}>
        <FooterS />
      </div>
    </div>
  );
};

export default Home;
