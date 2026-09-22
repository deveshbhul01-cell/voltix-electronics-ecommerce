import User from "../models/User.js";
import generateToken from "../config/generateToken.js";

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters."
      });
    }

    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists."
      });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const token =
      generateToken(user._id);

    return res.status(201).json({
      success: true,

      message:
        "Account created successfully.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while creating account."
    });
  }
};

export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required."
      });
    }

    const user =
      await User.findOne({
        email: email.toLowerCase()
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password."
      });
    }

    const validPassword =
      await user.comparePassword(
        password
      );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password."
      });
    }

    const token =
      generateToken(user._id);

    return res.json({
      success: true,

      message:
        "Login successful.",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Server error while logging in."
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  return res.json({
    success: true,

    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt
    }
  });
};
