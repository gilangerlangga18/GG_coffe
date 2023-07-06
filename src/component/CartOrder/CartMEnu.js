import { useLoginContext } from "../loginContext/LoginContext";

function CartMEnu({ item }) {
  const { deleteCart, testGetCart } = useLoginContext();

  const buttonDelete = () => {
    deleteCart(item.id);
    testGetCart();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "100px",
        // borderTop: "1px #BD0707 solid",
        // borderBottom: "1px #BD0707 solid",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <img
          style={{
            // border: "1px #BD0707 dashed",
            width: "80px",
            height: "80px",
            borderRadius: "10px",
          }}
          src={item.img}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // gap: "px",
          }}
        >
          <p> {item.product}</p>
          <p> topping : {item.toping} </p>
        </div>
      </div>
      <div
        style={{
          marginRight: "20px",
        }}
      >
        <p>{item.total} </p>
        <div onClick={buttonDelete}>
          {" "}
          <img
            src={"../../../images/smph.svg"}
            style={{
              //   border: "1px #BD0707 solid",
              //   width: "10px",
              //   height: "13px",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CartMEnu;
