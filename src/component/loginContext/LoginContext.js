// import axios, { Axios } from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { auth, db, storage } from "../../FireBase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const UserContext = createContext();
export const useLoginContext = () => useContext(UserContext);

export default function LoginContextProvider({ children }) {
  const [authGlobal, setAuthGLobal] = useState({
    id: "",
    isLogin: false,
    name: "",
    isAdmin: false,
    email: "",
  });
  // const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("userId");
    setAuthGLobal((prev) => ({
      ...prev,
      email: "",
      isAdmin: false,
      name: "",
      id: "",
      isLogin: false,
    }));
  };

  // login user
  const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    //

    // Call data from firestore
    const calledUser = await getDoc(doc(db, "users", user.uid));

    if (calledUser.exists()) {
      const userData = calledUser.data();
      setAuthGLobal((prev) => ({
        ...prev,
        email: userData.email,
        isAdmin: userData.role === "admin",
        name: userData.name,
        id: userData.id,
        isLogin: true,
      }));
      localStorage.setItem("userId", userData.id);
    } else {
      throw new Error();
    }
  };

  //

  // register user
  const regiserUser = async (name, email, password) => {
    // Register to firebase Auth
    const registeredUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store data to firestore
    const storedData = await setDoc(doc(db, "users", registeredUser.user.uid), {
      id: registeredUser.user.uid,
      name,
      email,
      role: "user",
    });

    console.log(storedData);
  };
  // register user

  // mengecek user sudah login apa blm
  const checkLogin = async () => {
    const userId = localStorage.getItem("userId");

    // Cek dlu useId ada atau gk?
    if (userId) {
      // Call data from firestore
      const calledUser = await getDoc(doc(db, "users", userId));

      if (calledUser.exists()) {
        const userData = calledUser.data();
        setAuthGLobal((prev) => ({
          ...prev,
          email: userData.email,
          isAdmin: userData.role === "admin",
          name: userData.name,
          id: userData.id,
          isLogin: true,
        }));
      }
    }
  };

  // add data tu cart

  const addCart = async (img, product, toping, total) => {
    try {
      return await addDoc(collection(db, "cart"), {
        img,
        product,
        toping,
        total,
        uid: authGlobal.id,
      });
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };

  // get cart
  const [udinGet, setUdinGet] = useState([]);

  const testGetCart = async () => {
    const userId = localStorage.getItem("userId");
    const q = query(collection(db, "cart"), where("uid", "==", userId));

    const querySnapshot = await getDocs(q);
    const udinData = [];
    querySnapshot.forEach((item) => {
      const itemObjek = {
        id: item.id,
        ...item.data(),
      };
      udinData.push(itemObjek);
    });
    setUdinGet(udinData);
  };

  // delete menu cart

  const deleteCart = async (id) => {
    await deleteDoc(doc(db, "cart", id));
  };

  // add transaction data
  const addTransaction = async (nama, email, phone, postcode, addres) => {
    try {
      const totalProduct = udinGet?.reduce((acc, curr) => acc + curr.total, 0);
      await addDoc(collection(db, "transactions"), {
        nama,
        email,
        phone,
        postcode,
        addres,
        status: "Waiting Approve",
        order: udinGet,
        total: totalProduct,
        uid: authGlobal.id,
      });

      // Hapus cart
      udinGet.forEach(async (item) => {
        await deleteCart(item.id);
      });
      testGetCart();
      // console.log("Document written with ID: ", docRef.id);
      // if (docRef?.hasOwnproperty("id")) {
      //   // navigate("/");
      // }
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  // get transaction data

  const [getCart, setGetCart] = useState([]);

  const getCartTransaction = async () => {
    const userId = localStorage.getItem("userId");
    const data = query(
      collection(db, "transactions"),
      authGlobal.isAdmin ? undefined : where("uid", "==", userId)
    );

    const querySnapshot = await getDocs(data);
    const newData = [];
    querySnapshot.forEach((item) => {
      const itemObjek = {
        id: item.id,
        ...item.data(),
      };
      newData.push(itemObjek);
    });
    setGetCart(newData);
  };

  //  update status

  const updateDocument = async (id, status) => {
    try {
      await updateDoc(doc(db, "transactions", id), {
        status,
      });
      getCartTransaction();
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };

  // get data product

  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const dataItem = [];
    querySnapshot.forEach((item) => {
      const itemObjek = {
        id: item.id,
        ...item.data(),
      };
      dataItem.push(itemObjek);
    });
    setProduct(dataItem);
  };

  // get topping
  const [toping, setToping] = useState([]);

  const gettoping = async () => {
    const querySnapshot = await getDocs(collection(db, "topping"));
    const dataItem = [];
    querySnapshot.forEach((item) => {
      const itemObjek = {
        id: item.id,
        ...item.data(),
      };
      dataItem.push(itemObjek);
    });
    setToping(dataItem);
  };

  // upload image

  const AddProduct = async (file, title, price) => {
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, file);
      const download = await getDownloadURL(storageRef);
      // console.log(download);
      try {
        await addDoc(collection(db, "products"), {
          img: download,
          title,
          price: parseInt(price),
        });
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
    // Klik add product
    // Upload Gambar
    // dapet link dari firestorage
    // Kirim nama, price, link gambar ke firestore
  };

  // add topping
  const AddTopping = async (file, title, price) => {
    if (file) {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      await uploadBytes(storageRef, file);
      const download = await getDownloadURL(storageRef);
      // console.log(download);
      try {
        await addDoc(collection(db, "topping"), {
          img: download,
          title,
          price: parseInt(price),
        });
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        getCart,
        udinGet,
        authGlobal,
        loginUser,
        regiserUser,
        checkLogin,
        logOut,
        addCart,
        deleteCart,
        addTransaction,
        getCartTransaction,
        updateDocument,
        getProduct,
        product,
        gettoping,
        toping,
        AddProduct,
        AddTopping,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
