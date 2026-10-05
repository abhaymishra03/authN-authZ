const User = require("../models/User");
const { signToken } = require("../utils/token");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // Duplicate check
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Create (password gets hashed by the pre-save hook)
    // Note: we pick fields explicitly, so a client can't sneak in role: "admin"
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

      },
    });
  } catch (err) {
    // Handles the race condition where two requests pass the check at once
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // password has select:false in the schema, so we must ask for it explicitly
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    // Same message whether the email or the password is wrong
    const invalidMsg = "Invalid email or password";

    if (!user) {
      return res.status(401).json({ message: invalidMsg });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: invalidMsg });
    }

   const token = signToken(user);

   res.cookie("token", token);

res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getMe = (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};