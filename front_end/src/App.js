import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Pagenotfound from './pages/Pagenotfound';
import Download from './pages/Download';
import Payslips from './pages/Payslips';
import Information from './pages/Information';
import Notifications from './pages/Notifications';
import Census from './pages/Census';
import Messaging from './pages/Messaging';
import Children from './pages/Children';
import Security from './pages/Security';
import Vision from './pages/Vision';
import Mission from './pages/Mission';
import Perspectives from './pages/Perspectives';
import Carousel from './pages/Carousel';
import OTP from './pages/OTP';
import DGI from './pages/DGI';
import Email from './pages/Email';
import Facebook from './pages/Facebook';
import Boxes from './pages/Boxes';
import Whatsapp from './pages/Whatsapp'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/download" element={<Download/>}/>
          <Route path="/payslips" element={<Payslips/>} />
          <Route path="/information" element={<Information/>}/>
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/census" element={<Census/>}/>
          <Route path="/messaging" element={<Messaging/>}/>
          <Route path="/children" element={<Children/>}/>
          <Route path="/security" element={<Security/>}/>
          <Route path="/mission" element={<Mission/>}/>
          <Route path="/vision" element={<Vision/>}/>
          <Route path="/perspectives" element={<Perspectives/>}/>
          <Route path="/boxes" element={<Boxes/>}/>
          <Route path="/carousel" element={<Carousel/>}/>
          <Route path="/OTP" element={<OTP/>}/>
          <Route path="/DGI" element={<DGI/>}/>
          <Route path="/Whatsapp" element={<Whatsapp/>}/>
          <Route path="/Email" element={<Email/>}/>
          <Route path="/Facebook" element={<Facebook/>}/>
          <Route path="*" element={<Pagenotfound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
