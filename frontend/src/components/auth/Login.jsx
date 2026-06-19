import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext.jsx";

import { PageHeader } from "@primer/react";
import {  Button } from "@primer/react";
import "./auth.css";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const { setCurrentUser} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  // useEffect(() => { // so nobody is logged in
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null);
  // },[setCurrentUser])

  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/login", {
        email: email,
        password: password,
      })

      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = '/';
    }catch(err){
      console.error(err);
      alert("Login failed")
    }
  }




    return (
      <div className="login-wrapper">
        <div className="login-logo-container">
          <img className="logo-login" src={logo} alt="Logo" />
        </div>

        <div className="login-box-wrapper">
          <div className="login-heading">
            <div sx={{ padding: 1 }}>
              <PageHeader>
                <PageHeader.TitleArea variant="large">
                  <PageHeader.Title>Login</PageHeader.Title>
                </PageHeader.TitleArea>
              </PageHeader>
            </div>
          </div>
          <div className="login-box">
            <div>
              <label className="label">Email address</label>
              <input
                autoComplete="off"
                name="Email"
                id="Email"
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
            <div className="div">
              <label className="label">Password</label>
              <input
                autoComplete="off"
                name="Password"
                id="Password"
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>

            <Button
              variant="primary"
              className="login-btn"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Loading..." : "Login"}

            </Button>
          </div>
          <div className="pass-box">
            <p>
              New to Waypoint? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    );
  };


  export default Login;