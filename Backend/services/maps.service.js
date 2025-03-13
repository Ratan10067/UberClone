const axios = require("axios");

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
        "x-rapidapi-key": "1b50c68d2cmsha8692b8438e3a26p167c82jsn01d33b01cd37",
        "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      },
    };
    console.log("yaha aya 1");
    const response = await axios.request(options);
    // console.log("Response from Google Maps API:", response.data);

    if (response.data.status === "OK") {
      return response.data.results[0].geometry.location; // ✅ Only return data
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

  const options = {
    method: "GET",
    url: "https://google-map-places.p.rapidapi.com/maps/api/distancematrix/json",
    params: {
      origins: origin,
      destinations: destination,
      transit_routing_preference: "less_walking",
      traffic_model: "pessimistic",
      avoid: "highways",
      language: "en",
      departure_time: "1782624107",
      mode: "driving",
      transit_mode: "train|tram|subway",
      units: "metric",
      region: "en",
    },
    headers: {
      "x-rapidapi-key": "1b50c68d2cmsha8692b8438e3a26p167c82jsn01d33b01cd37",
      "x-rapidapi-host": "google-map-places.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Google Maps API Response:", response.data);

    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No results found");
      }
      return response.data.rows[0].elements[0];
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
      "x-rapidapi-key": "1b50c68d2cmsha8692b8438e3a26p167c82jsn01d33b01cd37",
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

module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
};
