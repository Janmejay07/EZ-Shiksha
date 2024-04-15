import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET || "development-secret";

export const sendCookie = (user, res, message, statusCode = 200, data = {}) => {
  const token = jwt.sign({ _id: user._id }, getJwtSecret(), {
    expiresIn: "15m",
  });

  const isProduction = process.env.NODE_ENV === "production";

  return res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    })
    .json({
      success: true,
      message,
      data,
    });
};
