import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", //JWT Token Expiration = 7 Days
    });
    
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days = dd * hh * mm * ss * ms
        httpOnly: true, //Only accessible by the server
        sameSite: "strict", // Cross Site Request Forgery
        secure: process.env.NODE_ENV !== "development", //Only accessible in HTTPS
    })

    return token;
};