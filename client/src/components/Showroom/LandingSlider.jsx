import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/costura.jpg';
import img2 from '../../assets/pintor.jpg';
import img3 from '../../assets/obra.jpg';
import img4 from '../../assets/pintor2.jpg';
import img5 from '../../assets/soldadura.jpg';

import style from './LandingSlider.module.css'

const  DemoCarousel = () => {

    return (
        <div className={style.container}>
            <Carousel  autoPlay={true} >                
                    <div className={style.pict}>
                        <img src={img1} alt='pic1'/>                        
                    </div>
                    <div className={style.pict}>
                        <img src={img2} alt='pic2' />                       
                    </div>
                    <div className={style.pict}>
                        <img src={img3} alt='pic3'/>                        
                    </div>                
                    <div className={style.pict}>
                        <img src={img4} alt='pic4'/>                        
                    </div>     
                    <div className={style.pict}>
                        <img src={img5} alt='pic5'/>                        
                    </div>    
            </Carousel>
        </div>
        )
}
export default DemoCarousel;