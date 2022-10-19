import s from "./MiniPerfil.module.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useRef } from "react";


export default function SlideShow(){
    
    const slideshow = useRef(null)
    const intervalSlaideShow = useRef(null)
   

    const next = () => {
        if (slideshow.current.children.length > 0){
            const firstElement = slideshow.current.children[0]
            slideshow.current.style.transition = `300ms ease-out all`
            const sizeSlide = slideshow.current.children[0].offsetWidth
            slideshow.current.style.transform = `translateX(-${sizeSlide}px)`

            const transition = () => {
                slideshow.current.style.transition = 'none'
                slideshow.current.style.transform = `translateX(0)`

                slideshow.current.appendChild(firstElement)
                slideshow.current.removeEventListener("transitionend", transition)
            }

            slideshow.current.addEventListener("transitionend", transition)
        }
    }

    const previous = () => {
        if (slideshow.current.children.length > 0){
            const lastElement = slideshow.current.children[2]
            slideshow.current.insertBefore(lastElement, slideshow.current.firstChild)
            slideshow.current.style.transition = 'none'
            const sizeSlide = slideshow.current.children[0].offsetWidth
            slideshow.current.style.transform = `translateX(-${sizeSlide}px)`

            setTimeout(() => {
                slideshow.current.style.transition = '300ms ease-out all'
                slideshow.current.style.transform = `translateX(0)`
            },30)
        }
    }

    useEffect(() => {
        intervalSlaideShow.current = setInterval(() => {
            next()
        },15000)
    }, [])

    return(
        <div className={s.container}>
            <div className={s.containerSlide} ref={slideshow}>
                <div className={s.slide}>
                    <div className={s.img1}>
                        <img src="https://st3.depositphotos.com/9880800/i/600/depositphotos_170349410-stock-photo-construction-worker-with-building-plans.jpg" className={s.img1}/>
                    </div>
                </div>
                <div className={s.slide}>
                        <img src="https://fac.img.pmdstatic.net/scale/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Ffac.2F2021.2F10.2F15.2F99a5f913-6d5f-4568-9800-37d77fa227a4.2Ejpeg/autox600/quality/65/l-outil-genial-pour-faire-les-bons-choix-de-plantes-en-fonction-de-son-jardin.jpg" className={s.img1}/>
                    <div className={s.img2}>
                    </div>
                </div>
                <div className={s.slide}>
                    <div className={s.img3}>

                    </div>
                </div>
                
            </div>
        </div>
    )
}