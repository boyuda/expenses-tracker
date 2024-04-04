import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRouth from './components/PrivateRouth';

// TODO: refactor into 6.4 createBrowserRouter
const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route element={<PrivateRouth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
