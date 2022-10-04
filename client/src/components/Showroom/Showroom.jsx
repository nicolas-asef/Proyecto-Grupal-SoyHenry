
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useRef } from "react";


import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { getWorkersPremium } from '../../redux/actions/actions.js'
import arrowImage from '../../assets/flechita.png'
import './Showroom.css';


const ShowRoom = () => {

    const workers = useSelector((state) => state.workersPremium)
    const carousel = useRef(null);

    let dispatch = useDispatch();
	useEffect(() => {
        dispatch(getWorkersPremium());        
    }, [dispatch]);


    const handleLeftClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft -= carousel.current.offsetWidth
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        carousel.current.scrollLeft += carousel.current.offsetWidth
    }
    

    return (
        <div className='container'>
            <div className='carousel' ref={carousel}>
                {workers.map((item) => {
                    const { image, name, lastname, job, rating, id } = item;
                    return (
                        <div className='item' key="id">
                            <div className='image'>
                                <img src={image} alt="imageWorker"></img>                    
                            </div>
                            <div className='info'>
                                <span className='name'>{name} {lastname}</span>
                                <span className='job'>{job}</span>   
                                <Stack spacing={1}>
                                    <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
                                </Stack>
                                <span className='detail' href={`http://localhost:3001/worker/${id}`}> View Profile</span>
                            </div>

                        </div>
                    );
                })}
            </div>
            <div className='btnsSlider'>
                <button onClick={handleLeftClick}>
                    <img src={arrowImage} alt="Scroll-Left"/>
                </button>
                <button onClick={handleRightClick}>
                    <img src={arrowImage} alt="Scroll-Right"/>
                </button>
            </div>          
        </div>
    )
}

export default ShowRoom;