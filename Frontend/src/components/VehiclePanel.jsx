import React from "react";

const VehiclePanel = ({ setVehiclePanel, setConfirmedRidePanel }) => {
  return (
    <div>
      <h5
        onClick={() => setVehiclePanel(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="text-2xl ri-arrow-down-wide-line "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">Choose a Vehicle</h3>
      <div
        onClick={() => {
          setConfirmedRidePanel(true);
        }}
        className="flex border-2 active:border-black rounded-2xl items-center w-full p-3 justify-between mb-2"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKxobWsqpOYQilwWnLIdmfuU-af_USUUzY0ztgXUIYo6Dt1tKWA0WDND0rv-bbIa3wdU&usqp=CAU"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-2xl">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h4 className="font-medium text-base">2 mins away</h4>
          <p className="font-medium text-xs text-gray-700">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹194.20</h2>
      </div>
      <div
        onClick={() => {
          setConfirmedRidePanel(true);
        }}
        className="flex border-2 active:border-black rounded-2xl items-center w-full p-3 justify-between mb-2"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-2xl">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h4 className="font-medium text-base">2 mins away</h4>
          <p className="font-medium text-xs text-gray-700">
            Affordable, Motor-Cycle rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹66.20</h2>
      </div>
      <div
        onClick={() => {
          setConfirmedRidePanel(true);
        }}
        className="flex border-2 active:border-black rounded-2xl items-center w-full p-3 justify-between mb-2"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-2xl">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>2
            </span>
          </h4>
          <h4 className="font-medium text-base">2 mins away</h4>
          <p className="font-medium text-xs text-gray-700">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-2xl font-semibold">₹118.25</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
