import React from 'react';
import { useSelector } from 'react';
import workers from './workersexample.js'

import './TestimonialSlider.css'

const TestimonialShower = () => {    

    // const workers = useSelector((state) => state.workers)
    
    return (
        <>
            <div class="carousel">
                {workers && workers.map( w => {
                    return (                
                            <a class="carousel-item" href="#">
                                <div class="testi">
                                    <div class="img-area">
                                        <img src={w.User.img} alt="pics"/>
                                    </div>
                                    <p>{w.Contracts.comment_U}</p>
                                    <h4>{w.User.name} {w.User.lastName}</h4>
                                    <h5>{w.Jobs[0].name}</h5>
                                </div>    
                            </a>
                    )
                })};
            </div>
        </>
    )
};

export default TestimonialShower;
