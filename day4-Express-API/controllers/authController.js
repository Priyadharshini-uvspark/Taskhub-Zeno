
import {
  registerUser,
  loginUser
} from "../services/authService.js";
import jwt from "jsonwebtoken";


export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    
const result = await loginUser(req.body);

res.cookie("refreshToken", result.refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.status(200).json({
  success: true,
  message: "Login successful",
  accessToken: result.accessToken
});

    // const result = await loginUser(req.body);

    // res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   token: result.token
    // });
  } catch (error) {
    next(error);
  }
}

export function refresh(req, res, next) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new Error("Refresh token missing");
    }

    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
          });
        }

        const accessToken = jwt.sign(
          { id: decoded.id, role: decoded.role },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );

        res.json({
          success: true,
          accessToken
        });
      }
    );
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}

export function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
}


export function getMe(req, res) {
  res.status(200).json({
    success: true,
    user: req.user
  });
}
