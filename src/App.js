import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Home from "./components/home";
import Profile from "./components/profile";
import ResetPass from "./components/resetpass";
import UploadImage from "./components/uploadimage";
import Test from "./components/test";
import TestAPI from "./components/testAPI";
import TestWatermark from "./components/PreviewWatermark";

import SingleImage from "./components/SingleImage";
import SingleImageCopy from "./components/SingleImage copy";


function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn==="true" ? <Home /> : <SignIn /> } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/uploadimage" element={<UploadImage />} />
              <Route path="/resetpass" element={<ResetPass />} />
              <Route path="/test" element={<Test />} />
              <Route path="/testapi" element={<TestAPI />} />

              <Route path="/image/:id" element={<SingleImage />} />
              <Route path="/imageapi/:id" element={<SingleImageCopy />} />
              <Route path="/testwatermark" element={<TestWatermark />} />


              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;