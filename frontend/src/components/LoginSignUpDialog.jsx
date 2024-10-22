import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";


import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadar from "./Loadar";

export default function LoginSignUpDialog({ onClose, open }) {
  
  const handleClose = () => {
    onClose();
  };
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.warning("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-sigma-ecru.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        localStorage.setItem("token", data.token);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleSignUp = async () => {
    if (name === "" || email === "" || password === "") {
      toast.warning("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-sigma-ecru.vercel.app/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        handleLogin();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth="xs"
      sx={{
        borderRadius: "2rem",
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {isLogin ? "Login Form" : "Signup Form"}
      </DialogTitle>
      <div className="flex justify-center gap-x-4 mb-6">
        <button
          className={`px-6 py-2 text-lg font-semibold  ${
            isLogin ? "bg-black text-white" : "bg-gray-200 text-gray-800"
          } rounded-lg `}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 text-lg font-semibold  ${
            !isLogin ? "bg-black text-white" : "bg-gray-200 text-gray-800"
          } rounded-lg `}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      {!isLogin && (
        <input
          type="text"
          placeholder={"Name"}
          className=" w-4/5  mx-auto  p-3 mb-4  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <input
        type="text"
        placeholder={"Email"}
        className=" w-4/5  mx-auto  p-3 mb-4  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-4/5 mx-auto p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {
        loading ? <Loadar /> :
        <button
        className=" w-1/2 mx-auto my-4 bg-black text-white py-3 rounded-lg font-semibold"
        onClick={isLogin ? handleLogin : handleSignUp}
      >
        {isLogin ? "Login" : "Signup"}
      </button>}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        limit={1}
      />
    </Dialog>
  );
}
