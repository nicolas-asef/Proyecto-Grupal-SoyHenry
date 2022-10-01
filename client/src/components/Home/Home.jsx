import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import NavBar from "../NavBar/NavBar";
// import { useLocation } from "react-router-dom";


const Home = () => {


	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getJobs())
	},[dispatch])

	return (


	)

};

export default Home;
