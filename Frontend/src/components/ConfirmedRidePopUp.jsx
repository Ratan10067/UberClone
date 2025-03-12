import React from "react";
import { Link } from "react-router-dom";

const ConfirmedRidePopUp = ({
  setConfirmedRidePopUpPanel,
  setRidePopUpPanel,
}) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h5
        onClick={() => setConfirmedRidePopUpPanel(false)}
        className="p-1 text-center w-[93%] absolute top-0 "
      >
        <i className="text-2xl ri-arrow-down-wide-line "></i>
      </h5>
      <h3 className="font-semibold text-2xl mb-3">
        Confirm this Ride to Start
      </h3>
      <div className="flex items-center justify-between p-1.5 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-14 w-14 rounded-full object-cover"
            src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
            alt=""
          />
          <h2 className="text-xl font-medium">Ratan Kumar</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-300">
            <i className="ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">526/11-A</h3>
              <p className="text-base text-gray-700">IIT KHARAGPUR</p>
            </div>
          </div>
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
        <div className="mt-4 w-full">
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Enter OTP"
            />
            <Link
              to={"/captain-riding"}
              className="w-full flex justify-center mt-5 bg-green-500 font-semibold p-2 rounded-2xl"
            >
              Confirm
            </Link>
            <button
              onClick={() => {
                setConfirmedRidePopUpPanel(false);
                setRidePopUpPanel(false);
              }}
              className="w-full mt-1 bg-red-600 text-white font-semibold p-2 rounded-2xl"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedRidePopUp;
