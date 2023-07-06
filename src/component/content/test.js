import React, { useState, useEffect } from "react";
import DummyData from "../../dummydata/DummyData.json";
import { useLoginContext } from "../loginContext/LoginContext";
import MenuTable from "./MenuTable";
// import { useNavigate } from "react-router-dom";
import "./StyleMenu.css";

function MenuCoffe() {
  const [menu, setMenu] = useState([]);
  // const [filterMenu, setFilterMenu] = useState([])

  const { getProduct, product } = useLoginContext();

  useEffect(() => {
    setMenu(product);
  }, [product]);

  // console.log(product);

  useEffect(() => {
    getProduct();
  }, []);

  // console.log(menu);
  return (
    <div>
      <div>
        <p className="order">Let's Order</p>
        <div className="containerTable">
          {menu?.map((title, idx) => (
            <>
              <MenuTable key={idx} title={title} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuCoffe;
