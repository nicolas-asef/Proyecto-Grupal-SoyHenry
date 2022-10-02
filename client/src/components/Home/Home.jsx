import React from 'react';
import { useEffect, useState } from "react"
import  SearchBar  from '../SearchBar/SearchBar'
import { getJobs, getWorkers } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Footer from '../Footer/Footer';
import Filters from '../Filters/Filters';
import Catalog from '../Catalog/Catalog'
import Paginado from '../Pagination/Pagination';
import './Home.css';

const workers = [
  {name : "Martin"},
  {name : "Nicoals"},
  {name : "Juan"},
  {name : "Santi"},
  {name : "Luciano"},
  {name : "sab"},
  {name : "asdasd"},
  {name : "Jueqwean"},
  {name : "zxcz"},
  {name : "Luci213ano"},
  {name : "Martin"},
  {name : "Nicoals"},
  {name : "Juan"},
  {name : "Santi"},
  {name : "Luciano"},
  {name : "sab"},
  {name : "asdasd"},
  {name : "Jueqwean"},
  {name : "zxcz"},
  {name : "Luci213ano"},
  {name : "Martin"},
  {name : "Nicoals"},
  {name : "Juan"},
  {name : "Santi"},
  {name : "Luciano"},
  {name : "sab"},
  {name : "asdasd"},
  {name : "Jueqwean"},
  {name : "zxcz"},
  {name : "Luci213ano"}
]

const Home = () => {
  const [page, setPage] = useState (1)
  const lastIndex = page * 4
  const firstIndex = lastIndex - 4
  const currentWorkers = workers.slice(firstIndex, lastIndex)
  const pagesNumber = (num) => {
    setPage(num)
  }
  
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
      <div className='container'>
        <Catalog />
      </div>
      <div className="paginado">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Componente Paginado
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="footer">
        <Footer />
      </div>
      <Paginado
        callbk = {pagesNumber}
        cantWorkers = {workers.length}
      />
      {currentWorkers.map ( worker => {
        return (
          <div>
            {worker.name}
          </div>
        )
      })}

    </div>
  );
};

export default Home;
