import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carrusel.css';
import Carr1 from '../assets/carr1.jpg';
import Carr2 from '../assets/carr2.jpg';
import Carr3 from '../assets/carr3.jpg';
import Carr4 from '../assets/carr4.jpg';
import Carr5 from '../assets/carr5.jpg';
import Carr6 from '../assets/carr6.jpg';
import Carr7 from '../assets/carr7.jpg';
import Carr8 from '../assets/carr8.jpg';

function Carrusel(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={false}
      infinite={true}
      autoPlay={false}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      deviceType={props?.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
    <img src={Carr1} className="carouselImg" />
    <img src={Carr2} className="carouselImg" />
    <img src={Carr3} className="carouselImg" />
    <img src={Carr4} className="carouselImg" />
    <img src={Carr5} className="carouselImg" />
    <img src={Carr6} className="carouselImg" />
    <img src={Carr7} className="carouselImg" />
    <img src={Carr8} className="carouselImg" />

    
  </Carousel>
  )
}

export default Carrusel