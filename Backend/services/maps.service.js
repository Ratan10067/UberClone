const axios = require("axios");
const captainModel = require("../models/captain.model");
const getAddressCoordinates = async (address) => {
  if (!address) {
    throw new Error("Address parameter is required"); // ❌ Do NOT use res.status() in service
  }

  try {
    const options = {
      method: "GET",
      url: "https://google-map-places.p.rapidapi.com/maps/api/geocode/json",
      params: {
        address,
        language: "en",
        region: "en",
        result_type: "administrative_area_level_1",
        location_type: "APPROXIMATE",
      },
      headers: {
        "x-rapidapi-key": "0b4d48ead1msh810af415b49c375p16878bjsn7cc4ddc7bfe1",
        "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      },
    };
    console.log("getAddressCoordinates me hu");
    const response = await axios.request(options);
    // console.log("Response from Google Maps API:", response.data);

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Coordinates not found");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    throw new Error("Internal Server Error"); // ❌ Do NOT use res.status()
  }
};
const getDistanceTime = async (origin, destination) => {
  console.log("getDistanceTime called with:", { origin, destination }); // ✅ Debugging

  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }
  const originCoordinates = await getAddressCoordinates(origin);
  const destinationCoordinates = await getAddressCoordinates(destination);
  console.log(originCoordinates, destinationCoordinates);
  const options = {
    method: "GET",
    url: "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix",
    params: {
      origins: originCoordinates.ltd + "," + originCoordinates.lng,
      destinations:
        destinationCoordinates.ltd + "," + destinationCoordinates.lng,
    },
    headers: {
      "x-rapidapi-key": "1b50c68d2cmsha8692b8438e3a26p167c82jsn01d33b01cd37",
      "x-rapidapi-host": "trueway-matrix.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Distance Matrix API Response:", response.data);

    if (response.data.distances && response.data.durations) {
      return {
        distance: response.data.distances[0][0], // Extracting distance correctly
        duration: response.data.durations[0][0], // Extracting duration correctly
      };
    } else {
      throw new Error("Error fetching distance and time");
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw new Error("Internal Server Error");
  }
};
const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const options = {
    method: "GET",
    url: "https://google-map-places.p.rapidapi.com/maps/api/place/autocomplete/json",
    params: {
      input: input,
    },
    headers: {
      "x-rapidapi-key": "0b4d48ead1msh810af415b49c375p16878bjsn7cc4ddc7bfe1",
      "x-rapidapi-host": "google-map-places.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log("Google Maps API Response:", response.data); // ✅ Debugging Step

    if (response.data.status === "OK") {
      return response.data.predictions; // ✅ Return only predictions
    } else {
      throw new Error(`Google Maps API Error: ${response.data.status}`);
    }
  } catch (error) {
    console.log("Error fetching suggestions:", error.message);
    throw error;
  }
};
const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // here radius in KM
  console.log("ltd", ltd, "lng", lng, "radius", radius);

  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });
  console.log("getCaptainsInTheRadius : ", getCaptainsInTheRadius);
  return captains;
};
module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
  getCaptainsInTheRadius,
};
