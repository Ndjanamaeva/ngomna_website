import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from '@mui/material/Link';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import '../styles/Carousel.css';

import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import { Typography } from '@mui/material';

import img1 from '../components/assets/edit.jpg';
import img2 from '../components/assets/view.jpg';
import img3 from '../components/assets/download.jpg';
import img4 from '../components/assets/share.jpg';
import img5 from '../components/assets/store.jpg';


const imageData = [
  { src: img1, 
    description: 'Monthly payslips', 
    smallerText: 'In just a few clicks, access your payslip every month with nGomna',
    learnMoreLink: '/Payslips'},
  { src: img2, description: 'View payslips', smallerText: 'Take a look at your payslip before using it with nGomna', learnMoreLink: '/Payslips' },
  { src: img3, description: 'Download payslips', smallerText: 'Freely download your payslip with nGomna', learnMoreLink: '/Payslips' },
  { src: img4, description: 'Share payslips', smallerText: 'Easily share your payslip via other media with nGomna', learnMoreLink: '/Payslips' },
  { src: img5, description: 'Store payslips', smallerText: 'Safely keep records of all your downloaded payslips with nGomna', learnMoreLink: '/Payslips' },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCarousel();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  const animateCarousel = () => {
    setCurrentSlide((prevSlide) => (prevSlide === imageData.length - 1 ? 0 : prevSlide + 1));
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const handleLearnMoreClick = () => {
    window.location.href = imageData[currentSlide].learnMoreLink;
  };

  return (
    <div className="carousel-container" ref={carouselRef}>
      <div className="carousel-title animate">
        <Typography
          component="h2"
          variant="h4"
          >nGomna gives you full control on your payslips
        </Typography>
      </div>
      <div className="carousel-text-area">
        <p className='description'>{imageData[currentSlide].description}</p>
        <p className="smaller-text" style={{ marginBottom: '30px' }}>{imageData[currentSlide].smallerText} </p>
        <Link
          href={imageData[currentSlide].learnMoreLink}
          onClick={handleLearnMoreClick}
          sx={{
            textDecoration: 'none',
            fontFamily: 'Arial',
            fontSize: '17px',
            color: 'black',
            '&:hover': {
              color: 'green',
              textDecoration: 'underline',
            },
          }}
        >
          Learn More
          <KeyboardArrowRightIcon style={{ marginBottom: '-2px', fontSize: '17px' }} />
        </Link>
      </div>
      <Swiper
        effect={'cube'}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {imageData.map((item, index) => (
          <SwiperSlide key={`slide${index}`}>
            <img src={item.src} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
