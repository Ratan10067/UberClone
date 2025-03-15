const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapsService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  //   console.log(req);
  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json({ ride });
    const pickUpCoordinates = await mapsService.getAddressCoordinates(pickup);
    const captainsInRadius = await mapsService.getCaptainsInTheRadius(
      pickUpCoordinates.ltd,
      pickUpCoordinates.lng,
      2
    );
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ id: ride._id })
      .populate("user");
    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  console.log("pickup", pickup, " destination ", destination);
  try {
    const fare = await rideService.getFare(pickup, destination);
    console.log(fare);
    return res.status(200).json({ fare });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.confirmRide = async (req, res, next) => {
  const errors = validationResult(body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports.startRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  if (!rideId || !otp) {
    res.status(400).json({ error: "rideId or otp is required" });
  }

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.endRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({ message: error.message });
  }
};
