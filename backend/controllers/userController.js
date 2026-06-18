const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect();

  }
}



async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("waypoint");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
      email,
      repos: [],
      followedUsers: [],
      starRepos: []
    }

    const result = await usersCollection.insertOne(newUser);
    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.json({ token })
  } catch (err) {
    console.error("error during signup: ", err.message);
    res.status(500).send("server error");
  }
}

async function login (req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("waypoint");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.json({token, userId: user._id});
  } catch (err) {
    console.error("error during login: ", err.message);
    res.status(500).send("server error!");
  }
}

const getAllUsers = (req, res) => {
  res.send("all users fetched");
}

const getUserProfile = (req, res) => {
  res.send("profile fetched");
}

const updateUserProfile = (req, res) => {
  res.send("profile updated");
}

const deleteUserProfile = (req, res) => {
  res.send("profile deleted");
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile
}