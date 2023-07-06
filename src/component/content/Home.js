import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";
// import { useMenu } from "../imageComponent/ImageMenuContext.js";
import "./HomeStyle.css";
import MenuCoffe from "./MenuCoffe";

function Home() {
  const navigate = useNavigate();
  const { authGlobal } = useLoginContext();

  const checkAdmin = () => {
    if (authGlobal.isAdmin === true) {
      navigate("/transaction");
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [authGlobal.isAdmin]);

  return (
    <div>
      <div className="container-home">
        <div style={{ display: "flex" }}>
          <div className="content">
            <p className="title">GG Coffe & Resto</p>
            <p className="paragrafText">
              <p>Things are changing, but we're still here for you</p>
              we have temporarily closed our in-storecafes, but select grocery
              and drive-thru locations remainig open Waybucks Drivers is also
              avaibalble
            </p>
            <p className="paragrafOrder">Let's Order</p>
          </div>
          <div className="posterHome">
            <img src="../images/homeImage.svg" />
          </div>
        </div>

        <MenuCoffe />
      </div>
    </div>
  );
}

export default Home;
