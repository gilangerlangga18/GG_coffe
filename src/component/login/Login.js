// import React, { useState } from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eror, setEror] = useState(false);
  const { loginUser } = useLoginContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEror(false);
    try {
      await loginUser(email, password);
      navigate("/");
    } catch (error) {
      setEror(true);
    }
  };

  return (
    <div className="logincontain">
      <form className="boxLogin" onSubmit={handleLogin}>
        <p className="textlogin">Login</p>
        <div className="input-login">
          <input
            type="email"
            className="input-style"
            placeholder="Email....."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-style"
            placeholder="Password...."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p>
          Don't have an account ? klick{" "}
          <a onClick={() => navigate("/register")}>Here</a>
        </p>
        {eror ? <p>wrong email / password, Try again.</p> : []}
        {/* {udin ? <Asu /> : <Asi />} */}
      </form>
    </div>
  );
}

export default Login;
