import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUpPage/SignUp";
import SignIn from "./Pages/SignInPage/SignIn";
import "./App.css";
import Home from "./Pages/HomePage/Home";
import AnimalDetectionSystem from "./Pages/ImageDetectionPage/AnimalDetectionSystem";
import ForgetPassword from "./Pages/ForgetPasswordPage/ForgetPassword";
import EnterPassword from "./Pages/EnterPasswordPage/EnterPassword";
import AchievementsPage from "./Pages/RewardPage/AchievementsPage";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/animal-detection"
              element={<AnimalDetectionSystem />}
            />
            <Route path="/forgotpassword" element={<ForgetPassword />} />
            <Route path="/enterpassword" element={<EnterPassword />} />
            <Route path="/reward" element={<AchievementsPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
