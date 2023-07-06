import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useLoginContext } from "../loginContext/LoginContext";
import DropDown from "./DropDown";
import DropDownAdmin from "./DropDownAdmin";

function Navbar() {
  const { authGlobal } = useLoginContext();
  const navigate = useNavigate();

  const [drop, setDrop] = useState(false);
  const handlledrop = (u) => {
    setDrop(u);
  };

  const dropdown = () => {
    setDrop((prev) => (prev = !prev));
  };

  return (
    <div className="containNav">
      <img
        src="../../../images/logo.png"
        onClick={() => navigate("/")}
        className="logo"
      />

      {authGlobal.isLogin ? (
        <div
          style={{
            display: "flex",
            gap: " 40px",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {authGlobal.isAdmin ? (
            ""
          ) : (
            <img
              onClick={() => navigate("/cart")}
              src="../../../images/cart.svg"
            />
          )}

          <div
            tabIndex="0"
            onBlur={() => {
              setTimeout(() => {
                handlledrop(false);
              }, 300);
            }}
            onClick={dropdown}
          >
            <img
              src="../../../images/muka.jpeg"
              style={{
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                cursor: "pointer",
              }}
            />
          </div>
          {drop ? (
            authGlobal.isAdmin ? (
              <DropDownAdmin handlledrop={handlledrop} />
            ) : (
              <DropDown handlledrop={handlledrop} />
            )
          ) : (
            []
          )}
        </div>
      ) : (
        <div>
          <button
            className="button buttonLogin"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="button buttonRegister"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
