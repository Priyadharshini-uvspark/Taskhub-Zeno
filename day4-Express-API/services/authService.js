
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const users = [];

export async function registerUser({ name, email, password }) {
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role: "user"
  };

  users.push(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function loginUser({ email, password }) {
  const user = users.find((user) => user.email === email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "15m" }
//   );

//   return { token };


const accessToken = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { id: user.id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: "7d" }
);

return { accessToken, refreshToken };

}
