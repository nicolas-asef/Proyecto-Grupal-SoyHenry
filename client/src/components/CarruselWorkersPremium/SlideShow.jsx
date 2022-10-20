import s from "./SlideShow.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useRef } from "react";

export default function SlideShow() {
  const slideshow = useRef(null);
  const intervalSlaideShow = useRef(null);

  const next = () => {
    if (slideshow.current.children.length > 0) {
      const firstElement = slideshow.current.children[0];
      slideshow.current.style.transition = `300ms ease-out all`;
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      const transition = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;

        slideshow.current.appendChild(firstElement);
        slideshow.current.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    }
  };

  const previous = () => {
    if (slideshow.current.children.length > 0) {
      const lastElement = slideshow.current.children[2];
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);
      slideshow.current.style.transition = "none";
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      // setTimeout(() => {
      //     slideshow.current.style.transition = '300ms ease-out all'
      //     slideshow.current.style.transform = `translateX(0)`
      // },30)
    }
  };

  useEffect(() => {
    intervalSlaideShow.current = setInterval(() => {
      next();
    }, 7000);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.containerSlide} ref={slideshow}>
        <div className={s.slide}>
          <div className={s.img1}></div>
          <div className={s.textSlide}>Take control of your work easily</div>
        </div>
        <div className={s.slide}>
          <div className={s.img2}></div>
          <div className={s.textSlide}>Appears first in searches</div>
        </div>
        <div className={s.slide}>
          <div className={s.img3}></div>
          <div className={s.textSlide}>Buy now and get a discount of 15%</div>
        </div>
      </div>
      <div className={s.controlers}>
        <button className={`${s.boton} ${s.left}`} onClick={previous}>
          <ArrowBackIosIcon />
        </button>
        <button className={`${s.boton} ${s.right}`} onClick={next}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
