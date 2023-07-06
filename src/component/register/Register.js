import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";
// import { async } from "@firebase/util";

function Register() {
  const navigate = useNavigate();
  const { regiserUser } = useLoginContext();
  const [state, setState] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await regiserUser(state.fullName, state.email, state.password);
    navigate("/login");
  };

  return (
    <div className="registercontain">
      <div className="boxregister">
        <p className="textregister">register</p>
        <div className="input-register">
          <input
            name="email"
            type="email"
            className="input-style"
            placeholder="Email....."
            value={state.email}
            onChange={changeHandler}
          />
          <input
            name="password"
            type="password"
            className="input-style"
            placeholder="Password...."
            value={state.password}
            onChange={changeHandler}
          />
          <input
            name="fullName"
            type="text"
            className="input-style"
            value={state.fullName}
            placeholder="Full Name"
            onChange={changeHandler}
          />
        </div>
        <button className="register-button" onClick={submitHandler}>
          Register
        </button>
        <p>
          have an account ? klick <a onClick={() => navigate("/login")}>Here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
