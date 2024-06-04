const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./model/user_model");
const Place = require("./model/place_model");

require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000; // Set port from environment variable or default to 4000
const MONGO_URL = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);
const secret = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://travel-g0.vercel.app", // Replace with your frontend's actual origin
  })
);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/test", (req, res) => {
  res.json("Hello kaka!");
});

app.post("/register", async (req, res) => {
  const { name, email, password, profimgurl } = req.body;
  try {
    // Check if user with given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Hash the password before storing it
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create a new user with hashed password
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
      profimgurl: profimgurl,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // If email and password are correct, generate a JWT token
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Store the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    // Return user data without password
    const { password: _, ...userData } = user.toObject();
    res.json({ user: userData });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout successful" });
});

app.post("/addplaces", async (req, res) => {
  const { name, location, description, price, imgurl, category, userId } =
    req.body;
  try {
    const newPlace = new Place({
      name,
      location,
      description,
      price,
      imgurl,
      category,
      userId,
    });
    await newPlace.save();
    res.json(newPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/places", async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
