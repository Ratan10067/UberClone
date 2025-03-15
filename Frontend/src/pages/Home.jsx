import React, { useContext, useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState("");
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = function (e) {
    e.preventDefault();
  };
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);
  socket.on("");
  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });
  const handlePickupChange = async (e) => {
    setPickUp(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setPickupSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching pickup suggestions:", error);
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      setDestinationSuggestions(response.data.suggestions);
    } catch (error) {
      console.error("Error fetching destination suggestions:", error);
    }
  };
  const findTrip = async function () {
    setVehiclePanel(true);
    setPanelOpen(false);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickUp,
          destination: destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data.fare);
  };
  const createRide = async function () {
    setVehiclePanel(false);
    setConfirmedRidePanel(true);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
      {
        pickUp,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    setVehicleFound(true);
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 20,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );
  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.jpg"
        alt=""
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white relative p-5">
          <h5
            ref={panelCloseRef}
            className="right-6 top-6 absolute text-2xl opacity-0"
          >
            <i
              onClick={() => setPanelOpen(false)}
              className="ri-arrow-down-wide-line "
            ></i>
          </h5>

          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[40%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eeeeee] px-8 py-2 text-lg w-full rounded-lg mt-5"
              type="text"
              placeholder="Add a pick-up Location"
              value={pickUp}
              onChange={(e) => handlePickupChange(e)}
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eeeeee] px-8 py-2 text-lg w-full rounded-lg mt-3"
              type="text"
              placeholder="Enter Your Destination"
              value={destination}
              onChange={(e) => handleDestinationChange(e)}
            />
          </form>
          <div>
            <button
              onClick={findTrip}
              className="w-full flex justify-center text-white mt-5 bg-black font-basic p-2 rounded-2xl text-2xl"
            >
              Find Trip
            </button>
          </div>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickUp}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full z-10 px-3 py-8 bg-white"
      >
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
        />
      </div>
      <div
        ref={confirmedRidePanelRef}
        className="fixed bottom-0 w-full z-10 px-3 py-8 bg-white"
      >
        <ConfirmedRide
          createRide={createRide}
          pickUp={pickUp}
          destination={destination}
          setVehicleFound={setVehicleFound}
          setConfirmedRidePanel={setConfirmedRidePanel}
          fare={fare}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed bottom-0 w-full z-10 px-3 py-8 bg-white"
      >
        <LookingForDriver
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 w-full z-10 px-3 py-8 bg-white"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
