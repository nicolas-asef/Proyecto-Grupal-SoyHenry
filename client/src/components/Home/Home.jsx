import React from 'react';
// import NavBar from "../NavBar/NavBar";
// import { useLocation } from "react-router-dom";
import  SearchBar  from '../SearchBar/SearchBar'
import { getJobs, getWorkers } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
	let dispatch = useDispatch();
	useEffect(() => {
        dispatch(getJobs());
        dispatch(getWorkers())
      }, []);
	<div>
		<SearchBar/>
		<div>Home</div>
	</div>
	
};

export default Home;
