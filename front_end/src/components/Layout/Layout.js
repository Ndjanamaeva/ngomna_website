import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className='container'>
      <Header/>
      <div>{children}</div>
      <br/>
      <br/>
      <br/>
      <Footer/>
    </div>
  );
}

export default Layout;
