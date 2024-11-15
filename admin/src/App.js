import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js';
import Pagenotfound from './pages/pagenotfound';
import Carousel from './pages/carousel.js';
import Comments from './pages/comments';
import Login from './pages/login';
import Features from './pages/features.js'
import Boxes from './pages/boxes.js';
import Pages from './pages/pages';
import Register from './pages/register';
import Links from './pages/links';
import Contact from './pages/contact.js';
import About from './pages/about.js';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/features" element={<Features/>}/>
          <Route path="/boxes" element={<Boxes/>}/>
          <Route path="/pages" element={<Pages/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/carousel" element={<Carousel/>}/>
          <Route path="/comments" element={<Comments/>}/>
          <Route path="/links" element={<Links/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="*" element={<Pagenotfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App