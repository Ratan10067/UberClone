const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const app = express();
const connectDB = require("./db/db");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const connectToDB = () => {
  try {
    connectDB();
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
