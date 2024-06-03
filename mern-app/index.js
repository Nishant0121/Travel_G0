const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.json("Hello kaka!");
});
console.log(PORT);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
