import React, { useState, useEffect } from "react";
import DummyTopping from "../../dummydata/DummyToping.json";
import TopingTable from "./TopingTable";
import "./Toping.css";
import { useNavigate, useParams } from "react-router-dom";
import DummyData from "../../dummydata/DummyData.json";
import { useLoginContext } from "../loginContext/LoginContext";

function AddToping() {
  const [topping, setTopping] = useState([]);
  const { id } = useParams();
  const [totalBayar, setTotalBayar] = useState(0);
  const [selectedTopping, setSelectedTopping] = useState([]);
  const navigate = useNavigate();

  const { addCart, gettoping, toping, getProduct, product } = useLoginContext();

  const [menu, setMenu] = useState({
    id: "",
    img: "",
    title: "",
    price: "",
  });

  const { cart, setCart } = useState({
    id: "",
    product: "",
    toping: "",
    total: "",
  });

  useEffect(() => {
    const o = product.filter((u) => u.id == id);
    setMenu(o[0]);
    setTotalBayar(o[0].price);
  }, []);

  const dataTopping = () => {
    setTopping(toping);
  };

  useEffect(() => {
    dataTopping();
  }, [toping]);

  useEffect(() => {
    gettoping();
    getProduct();
  }, []);

  const totalPrice = (id) => {
    const topingCheck = selectedTopping.findIndex((item) => item === id);
    const topingSelect = toping.find((item) => item.id === id);

    if (topingCheck === -1) {
      setSelectedTopping((prev) => [...prev, id]);
      setTotalBayar((prev) => prev + topingSelect.price);
    } else {
      const updateSelectedToping = selectedTopping.filter(
        (item) => item.id !== id
      );
      setSelectedTopping(updateSelectedToping);
      setTotalBayar((prev) => prev - topingSelect.price);
    }
  };

  const a = () => {
    const selectedToppingToSubmit = toping.filter((item) =>
      selectedTopping.some((item2) => item.id === item2)
    );
    const mapTopping = selectedToppingToSubmit.map((item) => item.title);
    addCart(menu.img, menu.title, mapTopping, totalBayar);

    navigate("/");
  };

  return (
    <div className="body">
      <div className="container">
        <div>
          <img className="imageTpg" src={menu.img} />
        </div>
        <div className="tpgTitle tpgText">
          <p className="tpgMenuTitle tpgText">{menu.title}</p>
          <p style={{ fontWeight: "400", fontSize: "24px" }}> {menu.price}</p>
          <p className="tagTpg tpgText">Topping</p>
          <div className="tpgTable">
            {topping.map((title, idx) => (
              <>
                <TopingTable key={idx} title={title} totalPrice={totalPrice} />
              </>
            ))}
          </div>
          <div className="priceTpg tpngText">
            <p>total</p>
            <p>Rp. {totalBayar}</p>
          </div>
          <button className="btnTpg" onClick={a}>
            add Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToping;
