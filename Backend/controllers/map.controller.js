const mapsService = require("../services/maps.service");
const { validationResult } = require("express-validator");

const getCoordinates = async (req, res) => {
  console.log("Received Query:", req.query); // ✅ Debugging

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapsService.getAddressCoordinates(address);
    return res.status(200).json({ coordinates }); // ✅ Send result
  } catch (error) {
    console.log("yaha pr error aya", error.message);
    return res.status(404).json({ message: error.message });
  }
};
const getDistanceTime = async (req, res) => {
  console.log("Received Query:", req.query); // ✅ Debugging step

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array()); // ✅ Log validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Origin and Destination are required" });
  }

  try {
    const distanceTime = await mapsService.getDistanceTime(origin, destination);
    return res.status(200).json({ distanceTime });
  } catch (error) {
    console.log("Error in getDistanceTime Controller:", error.message);
    return res.status(500).json({ message: error.message });
  }
};
const getAutoCompleteSuggestions = async (req, res) => {
  console.log("Received Query:", req.query); // ✅ Debugging Step

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array()); // ✅ Debugging Step
    return res.status(400).json({ errors: errors.array() });
  }

  const input = req.query.input;

  if (!input) {
    return res.status(400).json({ message: "Input is required" });
  }

  try {
    const suggestions = await mapsService.getAutoCompleteSuggestions(input);
    return res.status(200).json({ suggestions });
  } catch (error) {
    console.log(
      "Error in getAutoCompleteSuggestions Controller:",
      error.message
    );
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
};
