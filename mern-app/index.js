const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("./model/user_model");
const Place = require("./model/place_model");
const Flight = require("./model/flight_model");
const Package = require("./model/package_model");
const FlightPackage = require("./model/flightpack_model");

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

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/place/:placeId", async (req, res) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId);
    if (place) {
      res.json(place);
    } else {
      res.status(404).json({ message: "Place not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addflight", async (req, res) => {
  try {
    const newflight = new Flight(req.body);
    await newflight.save();
    res.status(201).send("Advertisement created successfully");
  } catch (error) {
    res.status(500).send("Error creating advertisement");
  }
});

app.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/placepackage", async (req, res) => {
  const { userId, placeId } = req.body;

  try {
    let userPackage = await Package.findOne({ userId });

    if (!userPackage) {
      userPackage = new Package({ userId, placeId: [placeId] });
    } else {
      userPackage.products.push(placeId);
    }

    await userPackage.save();
    res.status(200).json(userPackage);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/package/:userId", async (req, res) => {
  const { userId } = req.params;

  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const pack = await Package.findOne({ userId: userObjectId });
    if (pack) {
      res.json(pack);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/flightpackage/:userId", async (req, res) => {
  const { userId } = req.params;

  // Validate the userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const pack = await FlightPackage.findOne({ userId: userObjectId });
    if (pack) {
      res.json(pack);
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/flightpackage/:userId", async (req, res) => {
  const { userId } = req.params;
  const { flightId } = req.body;

  try {
    // Find the user's package
    let userPackage = await FlightPackage.findOne({ userId });

    if (!userPackage) {
      // If no package exists for the user, create a new one
      userPackage = new FlightPackage({ userId, products: [] });
    }

    // Add the flight to the package
    userPackage.products.push(flightId);

    // Save the updated package
    await userPackage.save();

    res.status(200).json({ message: "Flight added to package successfully" });
  } catch (error) {
    console.error("Error adding flight to package:", error);
    res.status(500).json({ message: "Failed to add flight to package" });
  }
});

app.get("/flight/:flightId", async (req, res) => {
  const flightId = req.params.flightId;

  try {
    const flight = await Flight.findById(flightId);
    if (flight) {
      res.json(flight);
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/fpack/:packageId/flight/:flightId", async (req, res) => {
  try {
    const { packageId, flightId } = req.params;
    const updatedPackage = await FlightPackage.findByIdAndUpdate(
      packageId,
      { $pull: { products: flightId } },
      { new: true }
    );
    if (updatedPackage) {
      res.status(200).json({
        message: "Flight deleted from package successfully",
        updatedPackage,
      });
    } else {
      res.status(404).json({ message: "Package not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete flight from package" });
  }
});

app.delete("/pack/:packageId/place/:placeId", async (req, res) => {
  try {
    const { packageId, placeId } = req.params;
    await Package.findByIdAndUpdate(packageId, {
      $pull: { products: placeId },
    });
    res
      .status(200)
      .json({ message: "Place deleted from package successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete place from package" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
