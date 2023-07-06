import React, { useState } from "react";
import "./Toping.css";

const TopingTable = ({ title, totalPrice }) => {
  const [selected, setSelected] = useState(false);

  // membuat handle dimana toping yang dipilih akan memmiliki simbol
  const topingSelected = () => {
    setSelected((prev) => !prev);
    totalPrice(title.id);
  };

  return (
    <div>
      <div>
        {selected ? <p className="ceklis-toping">X</p> : []}
        <img
          src={title.img}
          onClick={topingSelected}
          className="toping-image"
        />
        <p>{title.title}</p>
      </div>
    </div>
  );
};

export default TopingTable;
