import React from "react";
import {Route, Routes} from "react-router";


// components
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Answers from "../pages/answer/Answers";

const App = () => {
  return (
    <div className="h-screen w-screen bg-white">
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={"/answers"} element={<Answers/>}/>
      </Routes>
    </div>
  );
};

export default App;
