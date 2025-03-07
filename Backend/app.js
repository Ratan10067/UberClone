const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
