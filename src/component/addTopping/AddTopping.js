// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";
// import { storage } from "../../FireBase";
import "./AddTopping.css";

function Addtopping() {
  const { AddTopping } = useLoginContext();
  const [image, setImage] = useState();
  const [topping, settopping] = useState({ title: "", price: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    settopping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerUpload = async (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const add = () => {
    AddTopping(image, topping.title, topping.price);
    navigate("/");
  };

  // console.log(image, file.title, file.price);

  return (
    <div className="body">
      <div
        className="container "
        style={{
          backgroundColor: "none",
          gap: "100px",
          justifyContent: "space-between",
        }}
      >
        <div className="input-topping">
          <div
            style={{
              fontSize: "800",
              fontSize: "36px",
              // backgroundColor: "white",
              width: "100%",
            }}
          >
            <p>Topping</p>
          </div>

          <div className="table-topping">
            <input
              className="input-tabletopping"
              placeholder="Nama Topping"
              type="text"
              name="title"
              value={topping.title}
              onChange={changeHandler}
            />
            <input
              className="input-tabletopping"
              placeholder="Price"
              type="text"
              name="price"
              value={topping.price}
              onChange={changeHandler}
            />
            <input
              className="input-tabletopping input-image"
              placeholder=" Photo topping"
              type="file"
              onChange={handlerUpload}
            />
          </div>
          <button className="input-tabletopping btn-topping" onClick={add}>
            Add Product
          </button>
        </div>
        <div className="image-topping-center">
          <img
            className="add-topping-image"
            style={{
              border: image ? "none" : "5px black dashed",
              height: image ? "auto" : "500px",
            }}
            src={image ? URL.createObjectURL(image) : ""}
          />
        </div>
      </div>
    </div>
  );
}

export default Addtopping;
