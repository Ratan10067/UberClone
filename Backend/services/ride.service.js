const { get } = require("http");
const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");
const { sendMessageToSocketId } = require("../socket");
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance / 1000) * perKmRate.auto +
        (distanceTime.duration / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance / 1000) * perKmRate.car +
        (distanceTime.duration / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance / 1000) * perKmRate.moto +
        (distanceTime.duration / 60) * perMinuteRate.moto
    ),
  };

  return fare;
}
module.exports.getFare = getFare;
function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}
module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All Fields are Required");
  }
  const fare = await getFare(pickup, destination);
  console.log("Fare:", fare);
  const ride = rideModel.create({
    user,
    pickup,
    otp: getOtp(6),
    destination,
    fare: fare[vehicleType],
  });
  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) throw new Error("Ride Id is Required");
  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    }
  );
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) throw new error("ride not found");
  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("RideId and OTP is required");
  }
  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("All fields are required");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid Otp");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );
  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });
  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("RideId is Required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("captain")
    .populate("user")
    .select("+otp");
  if (!ride) throw new Error("Ride not found");
  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );
  return ride;
};
