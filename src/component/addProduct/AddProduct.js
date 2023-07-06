// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../loginContext/LoginContext";
// import { storage } from "../../FireBase";
import "./AddProduct.css";

function AddProduct() {
  const { AddProduct } = useLoginContext();
  const [image, setImage] = useState();
  const [product, setProduct] = useState({ title: "", price: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setProduct((prev) => ({
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
    AddProduct(image, product.title, product.price);
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
        <div className="input-product">
          <div
            style={{
              fontSize: "800",
              fontSize: "36px",
              // backgroundColor: "white",
              width: "100%",
            }}
          >
            <p>Product</p>
          </div>

          <div className="table-product">
            <input
              className="input-tableproduct"
              placeholder="Nama Product"
              type="text"
              name="title"
              value={product.title}
              onChange={changeHandler}
            />
            <input
              className="input-tableproduct"
              placeholder="Price"
              type="text"
              name="price"
              value={product.price}
              onChange={changeHandler}
            />
            <input
              className="input-tableproduct input-image"
              placeholder=" Photo Product"
              type="file"
              onChange={handlerUpload}
            />
          </div>
          <button className="input-tableproduct btn-product" onClick={add}>
            Add Product
          </button>
        </div>
        <div className="image-product-center">
          <img
            className="add-product-image"
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

export default AddProduct;
