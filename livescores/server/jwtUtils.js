import jwt from "jsonwebtoken";

function generateToken(user) {
  // Generate and return jwt token
  const token = jwt.sign({ user }, "secretKey", { expiresIn: "1h" });
  return token;
}

export { generateToken }; // Export the function
