import express from "express";
import validate from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema
} from "../validators/authValidator.js";
import {
  register,
  login,
  refresh,
  logout,
  getMe
} from "../controllers/authController.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";


const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

router.get("/admin-test", authenticate, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export default router;