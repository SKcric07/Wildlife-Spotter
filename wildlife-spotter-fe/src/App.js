import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUpPage/SignUp';
import SignIn from './Pages/SignInPage/SignIn';
import './App.css';
import logo from './logo.svg';
import Home from './Pages/HomePage/Home';
import AnimalDetectionSystem from './Pages/ImageDetectionPage/AnimalDetectionSystem';
import ForgetPassword from './Pages/ForgetPasswordPage/ForgetPassword'

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/animal-detection" element={<AnimalDetectionSystem />} />
          <Route path="/forgotpassword" element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
