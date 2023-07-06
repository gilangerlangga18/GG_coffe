import React from "react";
import { FiLogOut } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import "./DropDown.css";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";

function DropDown(props) {
  const navigate = useNavigate();

  const clickDrop = () => {
    navigate("/profile");
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
        <p className="profile" onClick={clickDrop}>
          {" "}
          <BiUser className="logo-user" /> Profile
        </p>
        <p className="logout" onClick={handleLogout}>
          <FiLogOut className="logo-user" /> LogOut
        </p>
      </div>
    </div>
  );
}

export default DropDown;
