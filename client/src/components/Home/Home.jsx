import React from 'react';
import { useEffect, useState } from "react"
import  SearchBar  from '../SearchBar/SearchBar'
import { getJobs, getWorkers } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/Footer';
import Filters from '../Filters/Filters';
import Catalog from '../Catalog/Catalog'
import Paginado from '../Pagination/Pagination';
import './Home.css';


const Home = () => {
  const workers = useSelector (state => state.workers)
  const [page, setPage] = useState (1)
  const lastIndex = page * 4
  const firstIndex = lastIndex - 4
  const currentWorkers = workers.slice(firstIndex, lastIndex)
  const pagesNumber = (num) => {
    setPage(num)
  }
  console.log(workers)
  
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
        <Filters callbk={pagesNumber}/>
      </div>
      <div className="paginado">
        <Paginado
          callbk = {pagesNumber}
          cantWorkers = {workers.length}
        />
      </div>
      <div className='container'>
        <Catalog workers={currentWorkers} />
      </div>
      <div className="paginado">
        {/* <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Componente Paginado
            </Typography>
          </CardContent>
        </Card> */}
        <Paginado
          callbk = {pagesNumber}
          cantWorkers = {workers.length}
        />
      </div>
      <div className="footer">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
