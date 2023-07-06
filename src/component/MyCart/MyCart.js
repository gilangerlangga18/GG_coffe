import CartMEnu from "../CartOrder/CartMEnu";
import "./MyCart.css";
import { useLoginContext } from "../loginContext/LoginContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyCart() {
  const { udinGet, addTransaction } = useLoginContext();
  const totalProduct = udinGet?.reduce((acc, curr) => acc + curr.total, 0);

  const navigate = useNavigate();

  const [dataPay, setDataPay] = useState({
    nama: "",
    email: "",
    phone: "",
    postcode: "",
    addres: "",
  });

  const changeHandler = (e) => {
    setDataPay((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    await addTransaction(
      dataPay.nama,
      dataPay.email,
      dataPay.phone,
      dataPay.postcode,
      dataPay.addres
    );
    navigate("/");
  };

  const qty = udinGet?.length;

  // console.log(dataPay);

  // console.log(totalProduct);

  // console.log("iniudinget", udinGet);
  return (
    <div className="body">
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
          }}
        >
          <p
            style={{
              fontWeight: "900",
              fontSize: "28px",
            }}
          >
            My Cart
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "18px",
            }}
          >
            Review Your Order
          </p>
          <div
            style={{
              borderTop: "1px #BD0707 solid",
              borderBottom: "1px #BD0707 solid",
            }}
          >
            {udinGet?.map((item) => {
              return <CartMEnu item={item} key={item.id} />;
            })}
            {/* <CartMEnu /> */}
          </div>
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: "-25px",
                gap: "0px",
                marginTop: "40px",
                // backgroundColor: "yellow",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",

                    borderTop: "1px #BD0707 solid",
                    borderBottom: "1px #BD0707 solid",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Sub Total</p>
                    <p>Rp {totalProduct}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "-25px",
                      // gap: "20px",
                      // marginRight: "20px",
                    }}
                  >
                    <p>Qty</p>
                    <p>{qty}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Total</p>
                  <p>Rp {totalProduct}</p>
                </div>
              </div>
              {/* <div>
                <input
                  style={{
                    border: "3px #BD0707 solid",
                    width: "230px",
                    height: "130px",
                    borderRadius: "10px",
                  }}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            gap: "20px",
            alignItems: "center",
            marginTop: "145px",
          }}
        >
          <input
            style={{
              width: "350px",
              height: "50px",
              borderRadius: "7px",
              border: "2px #BD0707 solid",
            }}
            placeholder={"Name"}
            onChange={changeHandler}
            name="nama"
            value={dataPay.nama}
          />

          <input
            style={{
              width: "350px",
              height: "50px",
              borderRadius: "7px",
              border: "2px #BD0707 solid",
            }}
            placeholder={"Email"}
            onChange={changeHandler}
            name="email"
            value={dataPay.email}
          />

          <input
            style={{
              width: "350px",
              height: "50px",
              borderRadius: "7px",
              border: "2px #BD0707 solid",
            }}
            placeholder={"Phone"}
            onChange={changeHandler}
            name="phone"
            value={dataPay.phone}
          />

          <input
            style={{
              width: "350px",
              height: "50px",
              borderRadius: "7px",
              border: "2px #BD0707 solid",
            }}
            placeholder={"Post Code"}
            onChange={changeHandler}
            name="postcode"
            value={dataPay.postcode}
          />

          <input
            style={{
              width: "350px",
              height: "130px",
              borderRadius: "7px",
              border: "2px #BD0707 solid",
              background: "background: rgba(224, 200, 200, 0.25);",
            }}
            placeholder={"Addres"}
            onChange={changeHandler}
            name="addres"
            value={dataPay.addres}
          />

          <button
            style={{
              width: "350px",
              height: "50px",
              borderRadius: "7px",
              backgroundColor: "#BD0707",
              border: "2px #BD0707 solid",
              color: "white",
              cursor: " pointer",
            }}
            onClick={submitHandler}
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
