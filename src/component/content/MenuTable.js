import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./StyleMenu.css";
import { useNavigate } from "react-router-dom";
import DummyData from "../../dummydata/DummyData.json";
import { useLoginContext } from "../loginContext/LoginContext";

const MenuTable = ({ title, idx }) => {
  const navigate = useNavigate();

  const { authGlobal } = useLoginContext();

  const handlerCheck = (e) => {
    if (authGlobal.isLogin === true) {
      return navigate(`/addtoping/${title.id}`);
    } else {
      return navigate("/login");
    }
  };

  return (
    <div>
      <div className="Table" onClick={handlerCheck}>
        <img src={title.img} className="imageMenu" />
        <div className="">
          <p className="TitleMenu">{title.title} </p>
          <p>{title.price}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuTable;
