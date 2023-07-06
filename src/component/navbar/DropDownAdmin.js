import React from "react";
import { FiLogOut } from "react-icons/fi";
import { TbCup } from "react-icons/tb";
import { GiSnowBottle } from "react-icons/gi";
import "./DropDown.css";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";

function DropDownAdmin(props) {
  const navigate = useNavigate();

  const clickDrop = () => {
    navigate("/addproduct");
    // props.handlledrop(false);
  };
  const clickDropTopping = () => {
    navigate("/addtopping");
    // props.handlledrop(false);
  };
  const { logOut } = useLoginContext();

  const handleLogout = () => {
    {
      logOut();

      navigate("/login");
    }
  };

  return (
    <div className="body-drop">
      <div className="container-drop">
        <div className="profile-admin">
          <p className="addProduct" onClick={clickDrop}>
            {" "}
            <TbCup className="logo-user" /> Add Product
          </p>
          <p className="addTopping" onClick={clickDropTopping}>
            {" "}
            <GiSnowBottle className="logo-user" /> Add Topping
          </p>
        </div>

        <p className="logout-admin" onClick={handleLogout}>
          <FiLogOut className="logo-user" /> LogOut
        </p>
      </div>
    </div>
  );
}

export default DropDownAdmin;
