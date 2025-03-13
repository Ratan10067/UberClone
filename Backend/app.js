const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./db/db");
const mapsRoutes = require("./routes/maps.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 3000;
const connectToDB = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error(" MongoDB connection failed:", error);
  }
};
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});
const http = require("https");
app.get("/check", (req, res) => {
  const options = {
    method: "GET",
    hostname: "google-map-places.p.rapidapi.com",
    port: null,
    path: "/maps/api/geocode/json?address=IIT%20Kharagpur&language=en&region=en&result_type=administrative_area_level_1&location_type=APPROXIMATE",
    headers: {
      "x-rapidapi-key": "0b4d48ead1msh810af415b49c375p16878bjsn7cc4ddc7bfe1",
      "x-rapidapi-host": "google-map-places.p.rapidapi.com",
    },
  };

  req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.end();
  res.send("Hello World");
});
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
