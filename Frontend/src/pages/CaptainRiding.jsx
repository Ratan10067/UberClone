import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finshRidePanelRef = useRef(null);
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finshRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finshRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <div>
      <div className="h-screen">
        <div className="fixed p-3 top-0 flex items-center justify-between w-full">
          <img
            className="w-16 absolute left-5 top-5"
            src="https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.jpg"
            alt=""
          />
          <Link
            to={"/home"}
            className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
          >
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
          </Link>
        </div>

        <div className="h-4/5">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
          />
        </div>
        <div
          onClick={() => setFinishRidePanel(true)}
          className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
        >
          <h5 className="p-1 text-center w-[90%] absolute top-0">
            <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">{"4 KM away"}</h4>
          <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finshRidePanelRef}
        className="fixed bottom-0 w-full z-10 px-3 py-8 bg-white"
      >
        <FinishRide />
      </div>
    </div>
  );
};

export default CaptainRiding;
