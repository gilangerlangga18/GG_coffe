import "./App.css";
import AddProduct from "./component/addProduct/AddProduct";
import Transaction from "./component/admintransaction/Transaction";
import Home from "./component/content/Home";
// import MenuCoffe from "./component/content/MenuCoffe";
import Login from "./component/login/Login";
import MyCart from "./component/MyCart/MyCart";
import Navbar from "./component/navbar/Navbar";
import Register from "./component/register/Register";
import AddToping from "./component/toping/AddToping";
import UserProfile from "./component/user/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContextProvider, {
  useLoginContext,
} from "./component/loginContext/LoginContext";
import { useEffect } from "react";
import RoleRouting from "./component/roleRouting/RoleRouting";
import Addtopping from "./component/addTopping/AddTopping";

// import CustomImage from "./component/imageComponent/CustomImage";

function App() {
  const { checkLogin } = useLoginContext();
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/addtopping" element={<Addtopping />} />
          <Route path="/addtoping/:id" element={<AddToping />} />
          <Route path="/transaction" element={<Transaction />} />
          {/* <RoleRouting path="/transaction" element={Transaction} /> */}
          <Route path="/cart" element={<MyCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     // background: "#FFFBFB",m
//   }}
// >
{
  /* <Navbar />
      <Home /> */
}
{
  /* <MenuCoffe /> */
}
{
  /* <Login /> */
}
{
  /* <Register /> */
}
{
  /* <AddToping /> */
}
{
  /* <UserProfile /> */
}
{
  /* <AddProduct /> */
}
{
  /* <Transaction /> */
}
{
  /* <MyCart /> */
}
