import React from 'react';
import Layout from './../components/Layout/Layout';
import HeroSection from '../pages/HeroSection';
import Aboutngomna from '../pages/Aboutngomna';
import Carousel from '../pages/Carousel'
import FAQs from '../pages/FAQs'
import { Divider } from '@mui/material';


const Home = () => {
  return (
    <Layout>
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
      <Divider />
    </Layout>
  )
}

export default Home;
