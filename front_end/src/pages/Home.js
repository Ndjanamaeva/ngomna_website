import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import HeroSection from '../pages/HeroSection';
import Aboutngomna from './Boxes';
import Carousel from '../pages/Carousel'
import FAQs from '../pages/FAQs'
import Newcarousel from './Newcarousel'
import { Divider } from '@mui/material';


const Home = () => {
  return (
    <div className='container'>
      <Header/>
      <HeroSection/>
      <Divider/>
      <br/>
      <br/>
      <br/>
      <Aboutngomna/>
      <Divider/>
      <br/>
      <br/>
      <br/>
      <Carousel/>
      <Divider/>
      <br/>
      <br/>
      <br/>
      <FAQs/>
      <Divider/>
      <Footer/>
    </div>
  )
}

export default Home;
