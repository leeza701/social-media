// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const generateToken = (userId, res) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.cookie("jwt", token, {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000, // 1 day
//         sameSite:  "Lax",//"Strict", ""
//         // secure: process.env.NODE_ENV === "development"
//         secure: false
//     })
// };

// export { generateToken };


import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,       // REQUIRED on Render (https)
    sameSite: "none",   // REQUIRED for cross-site
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

