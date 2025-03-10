import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captain
      );
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-8"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt=""
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's your Email</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              type="password"
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#111] text-white w-full font-semibold px-4 py-2 rounded mb-3 ">
              Login
            </button>
          </form>
          <p className="text-center">
            join a fleet?{" "}
            <Link to="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-[#eb7d00] flex items-center justify-center text-white w-full font-semibold px-4 py-2 rounded mb-7 "
          >
            Sign In as a User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
