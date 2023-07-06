import React, { useEffect } from "react";
import { useLoginContext } from "../loginContext/LoginContext";
import TableTransaction from "./TableTransaction";
import "./Transaction.css";

function Transaction() {
  const { getCartTransaction, getCart } = useLoginContext();

  useEffect(() => {
    getCartTransaction();
  }, []);

  return (
    <div className="body">
      <div className="container " style={{ flexDirection: "column" }}>
        <p style={{ color: "#BD0707", fontSize: "40px", fontWeight: "800" }}>
          Income Transaction
        </p>
        <div>
          <TableTransaction data={getCart} />;
        </div>
      </div>
    </div>
  );
}

export default Transaction;
