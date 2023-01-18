import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import UserDetails from "./components/userDetails";
import ResetPass from "./components/resetpass";


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn==="true" ? <UserDetails /> : <Login /> } />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />
              <Route path="/resetpass" element={<ResetPass />} />

              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;