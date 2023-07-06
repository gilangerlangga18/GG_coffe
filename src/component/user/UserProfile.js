import React, { useEffect, useState } from "react";
import { useLoginContext } from "../loginContext/LoginContext";
import "./UserProfile.css";

function UserProfile() {
  const { authGlobal } = useLoginContext();
  const { getCartTransaction, getCart } = useLoginContext();
  const [order, setOrder] = useState([]);
  const [totaly, setTotaly] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getCartTransaction();
  }, []);

  useEffect(() => {
    a();
  }, [getCart]);

  const a = () => {
    if (getCart?.[0]?.order) {
      setOrder(getCart[0].order);
      setTotaly(getCart[0].total);
      setStatus(getCart[0].status);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="my-profile">
          <p style={{ fontSize: "30px", fontWeight: "900" }}>My Profile</p>
          <div className="card-profile">
            <img className="image-profile" src="../images/muka.jpeg" />
            <div className="title-profile">
              <div>
                <p style={{ fontWeight: "800" }}>Full Name</p>
                <p> {authGlobal.name}</p>
              </div>
              <div>
                <p style={{ fontWeight: "800" }}> Email</p>
                <p>{authGlobal.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-transaction">
          <p style={{ fontSize: "30px", fontWeight: "900", color: "#613d2b" }}>
            My transaction
          </p>
          <div>
            <div className="card-transaction">
              <div>
                {status === "Success" ? (
                  order.map((item) => (
                    <div className="card-table">
                      <img className="image-transaction" src={item.img} />
                      <div className="title-transaction">
                        <div>
                          <p style={{ fontWeight: "900", fontSize: "20px" }}>
                            {" "}
                            {item.product}
                          </p>
                        </div>
                        <div>
                          <p>topping : {item.toping} </p>
                          <p> Price : {item.total}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>

              <div className="qr-transaction">
                <img className="logo-transaction" src="../images/logo.png" />
                <div className="card-qr">
                  <img className="qr-image" src="../../../images/qr.svg" />
                  <p className="text-qr">{status}</p>
                </div>
                <div>
                  <p style={{ fontSize: "17px" }}>Sub Total : {totaly} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
