import React from "react";
import {useNavigate, useRoutes} from "react-router-dom";

// pages list
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import { useAuth } from "./authContext";

const ProjectRoutes = () =>{
  const {currentUser, setCurrentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    const userIdFromStorage = localStorage.getItem("userId");

    if(userIdFromStorage && !currentUser){ // if user id exists but user is not logged in
      setCurrentUser(userIdFromStorage)
    }

    if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)){
      navigate("/auth");
    }

    if(userIdFromStorage && window.location.pathname == "/auth"){
      navigate("/"); // dashboard
    }



  }, [currentUser, navigate, setCurrentUser]) // if any of these values change, that would trigger a reload

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard/>
    },
    {
      path: "/auth",
      element: <Login/>
    },
    {
      path: "/aignup",
      element: <Signup/>
    },
    {
      path: "/profile",
      element: <Profile/>
    },

  ])

  return element;
}

export default ProjectRoutes;

