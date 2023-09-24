import { NextFunction, Request, Response } from "express";
import LoggerTable from "../models/LoggerTable";
const { performance } = require("perf_hooks");

const Logger = async (req: Request, res: Response, next: NextFunction) => {
  const start = performance.now();

  const loggerData: Record<string, string | number | Object> = {
    request: {
      url: req.url,
      method: req.method,
      headers: req.headers,
      body: req.body,
    },
    response: {
      statusCode: res.statusCode,
      headers: res.getHeaders(),
    },
    status: res.statusCode,
    platform: process.platform,
    environment: process.env.NODE_ENV as string,
    time: new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Africa/Cairo",
        hour12: true,
      })
    ),
  };

  console.log(loggerData);

  const logEntry = new LoggerTable({
    time: loggerData.time,
    request: loggerData.request,
    response: loggerData.response,
    status: loggerData.status,
    platform: loggerData.platform,
    environment: loggerData.environment,
  });

  res.on("finish", async () => {
    const end = performance.now();
    const responseTime = end - start;
    loggerData["responseTime"] = responseTime.toFixed();

    try {
      await logEntry.save();
    } catch (error) {
      console.error("Error saving log entry:", error);
    }
  });

  next();
};

export default Logger;
