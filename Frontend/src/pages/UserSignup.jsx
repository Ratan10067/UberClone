import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-8"
          src="https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.jpg"
          alt="Uber Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="First Name"
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Last Name"
              required
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your Email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="example@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white w-full font-semibold px-4 py-2 rounded mb-3">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[12px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
