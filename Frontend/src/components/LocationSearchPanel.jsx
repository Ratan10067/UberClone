import React from "react";

const LocationSearchPanel = (props) => {
  const location = [
    "MS HALL IIT KHARAGPUR,KHARAGPUR",
    "RK HALL IIT KHARAGPUR,KHARAGPUR",
    "Nehru IIT KHARAGPUR,KHARAGPUR",
    "Azad IIT KHARAGPUR,KHARAGPUR",
  ];
  return (
    <div>
      {location.map((ele, idx) => {
        return (
          <div
            key={idx}
            onClick={(e) => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eeeeee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{ele}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
