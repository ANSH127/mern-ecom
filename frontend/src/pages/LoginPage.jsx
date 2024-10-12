import React from "react";
import LoginImage from "../assets/images/signin.png";
// import GoogleIcon from "../assets/images/googleIcon.png";
import Loadar from "../components/Loadar";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.warning("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://backend-sigma-ecru.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        localStorage.setItem("token", data.token);
        
        navigate("/");
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
    <div className="sm:w-4/5 w-full mx-auto  h-full shadow-lg py-4 ">
      <div
        className=" overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          height: "100vh",
          paddingBottom: "150px",
        }}
      >
        <div className="flex justify-center">
          <img
            src={LoginImage}
            alt="confession"
            className="rounded-lg mx-auto"
            width="400px"
            height="400px"
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* // signin form */}

          <input
            type="text"
            placeholder="Email"
            className={`w-full  p-2 border-2 border-gray-300 rounded-lg`}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-2 border-2 border-gray-300 rounded-lg`}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />

          <p className="text-center">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-500">
              {" "}
              Sign Up
            </Link>
          </p>

          {
            loading ? <Loadar /> :
            <button
              className="p-2 bg-black text-white rounded-lg"
              onClick={handleLogin}
            >
              Sign In
            </button>
          }
        </div>
      </div>
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
    </div>
  );
}
