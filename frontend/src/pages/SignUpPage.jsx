import React from "react";

import { Link } from "react-router-dom";

import Loadar from "../components/Loadar";
import { useNavigate } from "react-router-dom";

import SignUpImage from "../assets/images/signup.png";
// import GoogleIcon from "../assets/images/googleIcon.png";

// import axios from "axios";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "") {
      toast.warning("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:name,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        navigate("/login");
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
    <div className="sm:w-4/5 w-full mx-auto h-full shadow-lg py-4">
      <div
        className=" overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          height: "100vh",
          paddingBottom: "250px",
        }}
      >
        <div className="flex justify-center">
          <img
            src={SignUpImage}
            alt="confession"
            className="rounded-lg mx-auto"
            width="40%"
            height="40%"
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* // signin form */}
          <input
            type="text"
            placeholder="Name"
            className={"w-full  p-2 border-2 border-gray-200 rounded-lg"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className={"w-full  p-2 border-2 border-gray-300 rounded-lg"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={"w-full p-2 border-2 border-gray-300 rounded-lg"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </p>

          {
            loading ? <Loadar /> :
            <button
              className="p-2 bg-black text-white rounded-lg"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          }

          {/* <h3 className="text-center">Or</h3>
          <div className="flex justify-center gap-4">
            <img
              src={GoogleIcon}
              alt="google"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div> */}
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
