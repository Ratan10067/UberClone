const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { query } = require("express-validator");
const mapController = require("../controllers/map.controller");
router.get(
  "/get-coordinates",
  [
    query("address")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Address"),
  ],
  authMiddleware.authUser,
  mapController.getCoordinates
);

router.get(
  "/get-distance-time",
  [
    query("origin")
      .exists()
      .withMessage("Origin is required") // ✅ Check if exists
      .isString()
      .withMessage("Origin must be a string"),
    query("destination")
      .exists()
      .withMessage("Destination is required") // ✅ Check if exists
      .isString()
      .withMessage("Destination must be a string"),
  ],
  authMiddleware.authUser,
  mapController.getDistanceTime
);
router.get(
  "/get-suggestion",
  [
    query("input")
      .exists()
      .withMessage("Input is required") // ✅ Ensure input exists
      .isString()
      .withMessage("Input must be a string")
      .isLength({ min: 3 })
      .withMessage("Input must be at least 3 characters"),
  ],
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports = router;
