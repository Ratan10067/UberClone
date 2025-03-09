import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://farorelaw.co.uk/wp-content/uploads/2022/10/non-xQ-7A_Dv2GI-unsplash.jpg)] h-screen w-full pt-8 flex justify-between flex-col bg-red-400">
        <img
          className="w-16 ml-8"
          src="https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.jpg"
          alt=""
        />
        <div className="bg-white py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
