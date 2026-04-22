const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, lga } = req.body;

    // Validation check: If it's a farmer, lga MUST be provided
    if (role === "farmer" && !lga) {
      return res.status(400).json({
        success: false,
        message: "Farmers must provide a Local Government Area (LGA).",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phoneNumber,
      location: {
        lga: lga || "Plateau Resident", // Fallback for consumers if not provided
      },
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        lga: user.location.lga,
      },
    });
  } catch (err) {
    // If MongoDB returns code 11000, it means the email already exists
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered.",
      });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password, requiredRole } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (requiredRole && user.role !== requiredRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This account is registered as a ${user.role}.`,
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        lga: user.location?.lga,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Remove your token from local storage.",
  });
};
