const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http"); // ✅ Use http, NOT https
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./db/db");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
const { initializeSocket } = require("./socket");

// ✅ Create HTTP Server and attach Express
const server = http.createServer(app);
initializeSocket(server);

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

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

// ✅ Ensure the server listens for WebSocket
server.listen(port, () => {
  console.log(`🚀 Server & WebSocket running on port ${port}`);
});
