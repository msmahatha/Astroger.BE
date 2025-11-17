import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  });

  const isProduction = process.env.NODE_ENV === 'production';
  
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // Only use secure in production
    sameSite: isProduction ? "none" : "lax", // Use "none" in production, "lax" in development
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: "/" // Ensure cookie is available on all routes
  });

  return token;
};