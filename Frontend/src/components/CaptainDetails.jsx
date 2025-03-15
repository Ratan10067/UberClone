import React from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";
const CaptainDetails = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  console.log(captain);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <img
            className="h-15 w-15 rounded-full object-cover "
            src="https://i.pinimg.com/474x/a3/8e/29/a38e2969bb1864e42cd5dec70e18d2b4.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.fullname.firstname + captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹295 </h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 m-4 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-2xl font-thin ri-timer-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
        <div className="text-center">
          <i className="text-2xl font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
