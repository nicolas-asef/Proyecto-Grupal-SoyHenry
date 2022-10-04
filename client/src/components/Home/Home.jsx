import React from 'react';
import { useEffect, useState } from "react"
import  SearchBar  from '../SearchBar/SearchBar'
import { getJobs, getWorkers } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Filters from '../Filters/Filters';
import Catalog from '../Catalog/Catalog'
import ShowRoom from '../Showroom/Showroom'
import './Home.css';

const Home = () => {
  let dispatch = useDispatch();
	useEffect(() => {
      dispatch(getJobs());
      dispatch(getWorkers())
  }, [dispatch]);
      
	return (
    <div className="all-home">
      <div className='container'>
        <SearchBar/>
      </div>
      <div className='filter-container'>
        <Filters />
      </div>
      <div className='carousel'>
        <ShowRoom/>
      </div>
      <div className='container'>
        <Catalog />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
