import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState();
  const [vehicleType, setVehicleType] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );
      if (response.status === 201) {
        const data = response.data;
        console.log("API Response:", data.captain);
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
    setEmail("");
    setFirstName(" ");
    setLastName("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
            <h3 className="text-lg font-medium mb-2">
              What's our Captain's Name
            </h3>
            <div className="flex gap-4 mb-5">
              <input
                className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2  text-lg placeholder:text-base"
                type="text"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">
              What's our Captain's Email
            </h3>
            <input
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              type="password"
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex mb-2 gap-4">
              <input
                type="text"
                placeholder="Vehicle Color"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Vehicle Plate"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                required
              />
            </div>
            <div className="flex mb-2 gap-4">
              <input
                type="number"
                placeholder="Vehicle Capacity"
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                required
              />
              <select
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
              >
                <option value="" disabled>
                  select vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>
            <button className="bg-[#111] text-white w-full font-semibold px-4 py-2 rounded mb-3 ">
              Create Captain Account
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-600">
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
    </div>
  );
};

export default CaptainSignup;
