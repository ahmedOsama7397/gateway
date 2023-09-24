import { NextFunction, Request, Response } from "express";
import { JwtGenerator } from "../utils/JwtGenerator";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const tokenVerify = new JwtGenerator();
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    tokenVerify.jwtTokenVerify(token);
    next();
    // return res.status(200).send("verified token , welcome");
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
};

module.exports = authenticate;
