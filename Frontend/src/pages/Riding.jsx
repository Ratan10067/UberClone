import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link
        to={"/home"}
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg ri-home-4-line"></i>
      </Link>

      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKxobWsqpOYQilwWnLIdmfuU-af_USUUzY0ztgXUIYo6Dt1tKWA0WDND0rv-bbIa3wdU&usqp=CAU"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">Ratan</h2>
            <h4 className="text-xl font-semibold">BR 2025</h4>
            <p className="text-sm text-gray-600">Mercedez</p>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
              <i className="ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">526/11-A</h3>
                <p className="text-base text-gray-700">IIT KHARAGPUR</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="ri-cash-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹193.20</h3>
                <p className="text-base text-gray-700">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-500 font-semibold p-2 rounded-2xl">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
